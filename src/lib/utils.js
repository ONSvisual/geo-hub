import { csvParse, autoType } from "d3-dsv";
import { feature } from "topojson-client";
import { cdnUrl, geoCodesLookup, geoTypesLookup, geoNames } from "$lib/config";

export async function getData(url, fetch = window.fetch) {
  let res = await fetch(url);
  let str = await res.text();
  let data = csvParse(str, autoType);
  let cols = data.columns.filter(c => data[0][c] && data[0][c].includes("|"));
  data.forEach((d, i) => {
    cols.forEach(col => {
      d[col] = d[col].split("|");
    });
  });
  return data;
}

export async function getPlace(code, fetch = window.fetch) {
  try {
		let typeCode = code.slice(0, 3);
		let res = await fetch(`${cdnUrl}/${typeCode}/${code}.json`);
		let json = await res.json();

		if (geoNames[typeCode]) json.properties.typenm = geoNames[typeCode].label; 
		let childCodes = json.properties.children[0] ?
				Array.from(new Set(json.properties.children.map(d => d.areacd.slice(0, 3)))) : null;
		json.properties.childTypes = childCodes ? Array.from(new Set(childCodes.map(c => geoCodesLookup[c]))) : [];
		if (typeCode === "E12") {
			json.properties.childTypes = json.properties.childTypes.filter(c => c.key !== "lad");
			if (code === "E12000007") {
				json.properties.childTypes = [
					{
						key: "lad",
						codes: ["E09"],
						label: "borough",
						plural: "boroughs"
					},
					...json.properties.childTypes
				];
			}
		} 
    return {
      place: json.properties,
      type: geoCodesLookup[typeCode]
    };
	}
  catch {
    return {place: null, type: null};
  }
}

export function getName(props, context = null) {
  let name = props.hclnm ? props.hclnm : props.areanm ? props.areanm : props.areacd;
  let island = name.startsWith("Isle");
  let the = [
    "E12000001", "E12000002", "E12000004", "E12000005", "E12000006", "E12000008", "E12000009",
    "E09000001", "E07000035"
  ].includes(props.areacd) || 
    name.startsWith("Vale of");
  name = name.replace("&", "and").replace(", City of", "").replace(", County of", "");
  if (["in","the"].includes(context)) {
    if (island || the) name = "the " + name;
  }
  if (context === "in") {
    if (island) name = "on " + name;
    else name = "in " + name;
  }
  return name;
}

export function getParent(geocodes, parents) {
  for (const parent of parents) {
    let typecd = parent.areacd.slice(0, 3);
    if (geocodes.includes(typecd)) {
      parent.groupcd = geoCodesLookup[typecd].key;
      return parent;
    };
  }
  return null;
}

export function filterLinks(links, place) {
  let thislinks = [];
  let parentlinks = [];
  links.forEach(l => {
    let parent = getParent(l.geocodes, place.parents);
    if (l.geocodes.includes(place.typecd)) {
      thislinks.push({...l, place});
    } else if (parent) {
      parentlinks.push({...l, place: getParent(l.geocodes, place.parents)});
    }
  });
  return [...thislinks, ...parentlinks];
}

export function parseTemplate(template, place) {
  let output = template;
  let strs = template.match(new RegExp(/\{(.*?)\}/g));

  if (Array.isArray(strs)) {
    strs.forEach(s => {
      if (s.includes("name")) {
        let context = s.slice(1,-1).split(",")[1];
        output = output.replace(s, getName(place, context));
      } else {
        output = output.replace(s, place[s.slice(1,-1)]);
      }
    });
  }
  
  return output;
}

export function addArticle(str) {
  if (str === "output area") {
    str = "Output Area";
  } else if (str === "lower layer super output area") {
    str = "Lower layer Super Output Area (LSOA)";
  } else if (str === "middle layer super output area") {
    str = "Middle layer Super Output Area (MSOA)";
  }
  if (!str.startsWith('unit') && ['a', 'e', 'i', 'o', 'u'].includes(str[0].toLowerCase())) {
    return "an " + str;
  } else {
    return "a " + str;
  }
}

export function makePath(code) {
  if ([
    "K04", "E92", "W92",
    "E10", "E11", "E12",
    "E06", "E07", "E08", "E09", "W06",
    // "E14", "W07"
  ].includes(code.slice(0, 3))) {
    return code + "/";
  } else {
    return "area/?code=" + code;
  }
}

export function makeGeoJSON(topojson, layer) {
  let geojson = feature(topojson, layer);
  return geojson;
}

export function getColor(value, breaks, colors) {
  for (let i = 1; i < breaks.length; i ++) {
    if (value <= breaks[i]) {
      return colors[i - 1];
    }
  }
}

export function plusminus(val, strings = ["+", "-", ""]) {
  if (val > 0) {
    return strings[0];
  } else if (val < 0) {
    return strings[1];
  } else {
    return strings[2];
  }
}

export function suffixer(int) {
  let mod = Math.round(int) % 10;
  let suffix = int > 10 && int < 20 ? 'th' : mod == 1 ? 'st' : mod == 2 ? 'nd' : mod == 3 ? 'rd' : 'th';
  return int + suffix;
}

export function changeClass(val) {
  return val > 0 ? 'increase' : val < 0 ? 'decrease' : 'nochange';
}

export function changeStr(val, suffix = '', decimals = 0) {
  return val != 0 ? Math.abs(val).toFixed(decimals) + suffix : suffix == 'pp' ? 'n/c' : 'no change';
}

export function capitalise(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export function makeSum(values) {
  return values ? values.reduce((a, b) => a + b) : 0;
}

export function isNA(arr) {
  let sum = arr ? arr.slice(0,-1).reduce((a, b) => a + b) : 0;
  return sum == 0;
}

export function analyticsEvent(props) {
  if (window.dataLayer) window.dataLayer.push(props);
}