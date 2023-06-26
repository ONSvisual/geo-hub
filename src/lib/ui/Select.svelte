<script>
	import { onMount, createEventDispatcher } from "svelte";
  import { base } from "$app/paths";
  import { geoTypes, geoCodesLookup, geoNames } from "$lib/config";
  import { getData, capitalise } from "$lib/utils";
	import Select from "svelte-select";

	const searchIcon = `<svg viewBox="0 0 20 20" fill-rule="evenodd"><path d="M0,8a8,8,0,1,0,16,0a8,8,0,1,0,-16,0ZM3,8a5,5,0,1,0,10,0a5,5,0,1,0,-10,0Z"/><path d="M18,20L20,18L14,12L12,14Z"/></svg>`;
	const chevronIcon = `<svg viewBox="0 0 20 20"><path d="M1,6L19,6L10,15Z"/></svg>`;
	const dispatch = createEventDispatcher();

	export const regionReverseLookup = {
		"England": "E92000001",
		"Wales": "W92000004",
		"North East": "E12000001",
		"North West": "E12000002",
		"Yorkshire and The Humber": "E12000003",
		"East Midlands": "E12000004",
		"West Midlands": "E12000005",
		"East of England": "E12000006",
		"London": "E12000007",
		"South East": "E12000008",
		"South West": "E12000009",
	};

	export let id = "";
	export let container = undefined;
	export let mode = "default";
	export let placeholder = "Type an area name or postcode";
	export let value = null;
	export let filterText = "";
	export let isSearchable = true;
	export let isClearable = true;
	export let autoClear = false;
	export let idKey = "value";
	export let labelKey = "label";
	export let groupKey = null;
	export let groupItems = false;
	export let fontSize = "1em";
	export let height = 42;
	export let isMulti = false;
	export let maxSelected = 4;
	export let colors = ["#206095", "#a8bd3a", "#871a5b", "#27a0cc"];
	export let darkMode = false;
	export let borderColor = darkMode ? "white" : "#206095";

	const startsWithFilter = (str, filter) => str.toLowerCase().startsWith(filter.toLowerCase());
	const filterSort = (a, b) => startsWithFilter(a.areanm, filterText) && startsWithFilter(b.areanm, filterText) ? 0 :
		!startsWithFilter(a.areanm, filterText) && startsWithFilter(b.areanm, filterText) ? 1 :
		startsWithFilter(a.areanm, filterText) && !startsWithFilter(b.areanm, filterText) ? -1 : 0;

	export async function loadOptions(filterText) {
		if (filterText.length > 2 && /\d/.test(filterText)) {
			let res = await fetch(`https://api.postcodes.io/postcodes/${filterText}/autocomplete`);
			let json = await res.json();
			return json.result.map(d => ({areacd: d, areanm: d, group: "", postcode: true}));
		} else if (filterText.length > 2) {
			return items.filter(p => p.areanm.match(new RegExp(`\\b${filterText}`, 'i')))
				.sort(filterSort)
		}
		return [];
	}
	async function doSelect(e) {
		if (e.detail.postcode) {
			let res = await fetch(`https://api.postcodes.io/postcodes/${e.detail.areacd}`);
			let json = await res.json();
			if (json.result) {
        let places = [];
        geoTypes.filter(g => g.pcio).forEach(g => {
          let name = json.result[g.pcio];
          if (name && !name.includes('unparished')) {
            let code = json.result.codes[g.pcio] ? json.result.codes[g.pcio] : regionReverseLookup[name];
            places.push({areacd: code, areanm: name, typenm: g.label.replace("/unitary", "")});
          }
        });
				let place = items.find(p => p.areacd == json.result.codes.admin_district);
				if (place) {
					placeholder = "Type a place name or postcode";
          dispatch("select", {type: "postcode", areacd: place.areacd, postcd: json.result.postcode, places});
				} else {
					placeholder = "Postcode must be in England or Wales";
				}
			}
		} else {
      let areacd = e.detail[idKey];
      let areanm = e.detail[labelKey];
			dispatch("select", {type: "place", areacd, areanm });
			placeholder = "Type a place name or postcode";
		}
	}
	
	const getOptionLabel = groupKey && !groupItems ? (option) => `${option[labelKey]} <span class="group">${option[groupKey]}</span>` : (option) => option[labelKey];
	export let getSelectionLabel = (option) => {
		if (option) return getOptionLabel(option)
		else return null;
	};
	const groupBy = groupItems && groupKey ? (item) => item[groupKey] : undefined;
	const indicatorSvg = mode == "search" ? searchIcon : chevronIcon;
	const containerStyles = `--inputFontSize: ${fontSize}; --groupTitleFontSize: ${fontSize}; --height: ${height}px; font-size: ${fontSize};`;
	
	const ariaValues = (values) => `${values}, selected.`;
	const ariaListOpen = (label, count) => `You are currently focused on ${label}. There are ${count} results available.`;
	const ariaFocused = () => `Select is focused, type to refine list, press down to open the menu.`;
	
	$: noOptionsMessage = isWaiting ? "Loading..." : mode == "search" && filterText.length < 3 ? "Enter 3 or more characters for suggestions" : `No results match ${filterText}`;
	$: itemFilter = (Array.isArray(value) && value.length >= maxSelected) || mode == "search" && filterText.length < 3
	? (label, filterText, option) => false
	: (label, filterText, option) => true;
	
	let el;
  let items;
	let isFocused;
	let listOpen;
	let isWaiting;
	let handleClear;

  const getTypeLabel = (type) => geoNames[type] ? geoNames[type].label : geoCodesLookup[type].label;

  async function getPlaces() {
    let places = await getData(`${base}/data/csv/places.csv`);
    places.sort((a, b) => a.areanm.localeCompare(b.areanm));
    let lookup = {};
    places.forEach(d => lookup[d.areacd] = d);
    places.forEach(d => {
      let type = d.areacd.slice(0, 3);
      d.group = type === "K02" ? "" :
        d.parentcd ? `${capitalise(getTypeLabel(type))} in ${lookup[d.parentcd].areanm}` :
        capitalise(getTypeLabel(type));
    });
    return places;
  }
	
	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	async function handleSelect(e) {
		doSelect(e);
		if (autoClear) {
			handleClear();
		} else if (isClearable) {
			// Hack to allow selection to be cleared by keyboard
			await sleep(10);
			let clearSelect = el.getElementsByClassName("clearSelect")[0];
			if (clearSelect) {
				clearSelect.tabIndex = 0;
				clearSelect.onkeypress = (e) => { if (e.key == "Enter") handleClear() };
				clearSelect.removeAttribute("aria-hidden");
				clearSelect.setAttribute("aria-label", "Clear selection");
			}
		}
	}
	
	onMount(async () => items = await getPlaces());
</script>

<div class="selectbox" class:multi-selected={value && isMulti} class:focused={isFocused} class:selected={value && !listOpen && !isMulti}
  style:--firstItem={colors[0 % colors.length]} style:--secondItem={colors[1 % colors.length]} style:--thirdItem={colors[2 % colors.length]} style:--fourthItem={colors[3 % colors.length]} style:--borderColor={borderColor}
  bind:this={el}>
	{#if items}
  <Select
		{id} {container} {items} {placeholder} {isMulti} {isSearchable}
		{groupBy} {loadOptions} {getSelectionLabel} {getOptionLabel} {itemFilter}
		{ariaValues} {ariaListOpen} {ariaFocused} {noOptionsMessage} {indicatorSvg}
		{containerStyles}
		optionIdentifier={idKey}
		bind:isFocused bind:value bind:listOpen bind:filterText bind:isWaiting bind:handleClear
		on:select={handleSelect} on:clear on:loaded on:error
		showIndicator isClearable={!isClearable ? false : !isMulti}/>
  {/if}
</div>

<style>
	.selectbox {
		box-sizing: border-box;
		margin: 0;
		border: 0;
		max-width: 450px;
    --border: 2px solid var(--borderColor, #206095);
    --borderRadius: 0;
		--listBorderRadius: 0;
		--itemFirstBorderRadius: 0;
		--multiItemBorderRadius: 0;
		--padding: 0 8px;
		--multiSelectPadding: 0 8px;
		--clearSelectBottom: auto;
		--clearSelectRight: 8px;
		--clearSelectTop: auto;
		--clearSelectWidth: 24px;
		--clearSelectColor: #206095;
		--borderHoverColor: var(--borderColor, #206095);
		--borderFocusColor: var(--borderColor, #206095);
		--inputColor: #206095;
		--itemColor: #206095;
		--placeholderColor: #206095;
		--itemIsActiveBG: #206095;
		--itemHoverBG: #3875d7;
		--itemHoverColor: white;
		--clearSelectColor: white;
		--clearSelectFocusColor: white;
		--clearSelectHoverColor: white;
		--indicatorColor: white;
		--multiItemActiveColor: white;
		--multiClearFill: white;
		--multiClearBG: none;
		--multiClearHoverBG: none;
		--multiItemBG: grey;
		--multiItemActiveBG: grey;
		--spinnerColor: rgba(255,255,255,0);
  }
	:global(.selectbox, .selectbox input, .selectbox .item, .selectbox svg) {
		cursor: pointer !important;
	}
	:global(.selectbox input:focus) {
		cursor: default !important;
	}
	:global(.selectbox > .selectContainer) {
		box-shadow: inset -40px 0px #206095;
	}
	:global(.selectbox.multi-selected > .selectContainer) {
		box-shadow: none !important;
	}
	:global(.selectbox.focused > .selectContainer) {
		outline: 4px solid orange;
	}
	:global(.selectbox.selected > .selectContainer) {
		background-color: #206095 !important;
	}
	:global(.selectbox.selected .selectedItem) {
		color: white !important;
		font-weight: bold;
	}
	:global(.selectbox .selectedItem .group) {
		display: none;
	}
	:global(.selectbox .item > .group) {
		font-size: smaller;
		opacity: 0.7;
	}
	:global(.selectbox .selectContainer > .multiSelectItem) {
		color: white !important;
		font-weight: bold;
	}
	:global(.selectbox .selectContainer > .multiSelectItem:nth-of-type(1)) {
		background-color: var(--firstItem) !important;
	}
	:global(.selectbox .selectContainer > .multiSelectItem:nth-of-type(2)) {
		background-color: var(--secondItem) !important;
	}
	:global(.selectbox .selectContainer > .multiSelectItem:nth-of-type(3)) {
		background-color: var(--thirdItem) !important;
	}
	:global(.selectbox .selectContainer > .multiSelectItem:nth-of-type(4)) {
		background-color: var(--fourthItem) !important;
	}
	:global(.selectbox .indicator svg) {
		fill: white;
	}
	:global(.selectbox .clearSelect) {
		height: 24px;
	}
	:global(.selectbox .clearSelect:focus) {
		outline: 4px solid orange;
	}
	:global(.selectbox .indicator) {
		width: 20px;
		height: 20px;
		line-height: 1;
	}
	:global(.selectbox .multiSelectItem .group) {
		display: none;
	}
</style>