<script>
	export let hovered = null;
	export let selected = null;
	export let lineWidth = 3;
	export let height = 12;
	export let breaks = [0,20,40,60,80,100];
	export let colors = ['rgba(234,236,177,.8)', 'rgba(169,216,145,.8)', 'rgba(0,167,186,.8)', 'rgba(0,78,166,.8)', 'rgba(0,13,84,.8)'];
  export let formatTick = d => d.toFixed(0);
  export let suffix = "";
	export let snapTicks = true;
	
	const pos = (val, breaks) => {
		let i = 0;
		while (val > breaks[i + 1]) i += 1;
		let unit = 100 / (breaks.length - 1);
		let offset = (val - breaks[i]) / (breaks[i + 1] - breaks[i]);
		return (i + offset) * unit;
	}
</script>

<div class="breaks-container" style="height: {height}px">
	{#each breaks.slice(1) as brk, i}
		<div class="breaks-block" style="width: {100 / (breaks.length - 1)}%; left: {i * (100 / (breaks.length - 1))}%; background-color: {colors[i]};"/>
		<div class="breaks-line" style="left: {i * (100 / (breaks.length - 1))}%;"/>
		<div class="breaks-tick" style="left: {i * (100 / (breaks.length - 1))}%; transform: translateX({i == 0 && snapTicks ? '-2px' : '-50%'});">{formatTick(breaks[i])}</div>
	{/each}
	<div class="breaks-line" style="right: 0;"/>
	<div class="breaks-tick" style="right: 0; transform: translateX({snapTicks ? '2px' : '50%'});">{formatTick(breaks[breaks.length - 1])}{suffix}</div>
	{#if selected}
	<div class="breaks-marker" style="width: {lineWidth}px; left: calc({pos(selected, breaks)}% - {lineWidth / 2}px);"/>
	<div class="breaks-value" style="left: {pos(selected, breaks)}%">{selected}{suffix}</div>
  {/if}
  {#if hovered}
	<div class="breaks-marker breaks-marker-hovered" style="width: {lineWidth}px; left: calc({pos(hovered, breaks)}% - {lineWidth / 2}px);"/>
	<div class="breaks-value breaks-value-hovered" style="left: {pos(hovered, breaks)}%">{hovered}{suffix}</div>
  {/if}
</div>

<style>
	.breaks-container {
    display: block;
		margin: 30px 0 30px 0;
		box-sizing: border-box;
		position: relative;
		width: 100%;
    font-size: 14.4px;
	}
	.breaks-block {
		position: absolute;
		top: 0;
		height: 100%;
	}
	.breaks-line {
		position: absolute;
		top: 0;
		height: calc(100% + 10px);
		border-left: solid 1px black;
	}
	.breaks-tick {
		position: absolute;
		z-index: 1;
		top: calc(100% + 8px);
		text-align: center;
		transform: translateX(-50%);
	}
	.breaks-marker {
		position: absolute;
		z-index: 2;
		top: -10px;
		height: calc(100% + 10px);
		background-color: black;
	}
	.breaks-marker-hovered {
		background-color: orange;
	}
	.breaks-value {
		position: absolute;
		top: -32px;
		text-align: center;
		transform: translateX(-50%);
		background-color: rgba(255,255,255,.8);
	}
	.breaks-value-hovered {
		color: orange;
	}
</style>