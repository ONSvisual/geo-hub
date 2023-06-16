import { csvParse, autoType } from "d3-dsv";
import { feature } from "topojson-client";
import { cdnUrl, geoCodesLookup, geoTypesLookup, geoNames, geoTypes } from "$lib/config";

export async function getData(url, fetch = window.fetch) {
  let res = await fetch(url);
  let str = await res.text();
  let data = csvParse(str, autoType);
  let cols = data.columns.filter(c => {
    data[0][c] && String(data[0][c]).includes("|");
  });
  data.forEach((d, i) => {
    cols.forEach(col => {
      d[col] = d[col].split("|");
    });
  });
  return data;
}

function makeChildTypes(childcds) {
  let childTypes = Array.from(new Set(childcds.sort((a, b) => a.localeCompare(b)).map(cd => geoCodesLookup[cd])))
    .filter((d, i, arr) => arr.map(a => a.key).indexOf(d.key) === i);
  const filterKeys = ["cauth", "utla", "ltla"].filter(key => childTypes.map(t => t.key).includes(key));
  if (filterKeys.length > 1) childTypes = childTypes.filter(ct => !filterKeys.slice(1).includes(ct.key));
  const sortKeys = geoTypes.map(g => g.key);
  return childTypes.sort((a, b) => sortKeys.indexOf(a.key) - sortKeys.indexOf(b.key));
}

export async function getPlace(code, fetch = window.fetch) {
  try {
		let typeCode = code.slice(0, 3);
		let res = await fetch(`${cdnUrl}/${typeCode}/${code}.json`);
		let json = await res.json();

		json.properties.childTypes = makeChildTypes(json.properties.child_typecds);
		
    return {
      place: json.properties,
      type: geoCodesLookup[typeCode],
      geometry: json.properties.end ? json.geometry : null,
    };
	}
  catch (err) {
    console.debug(err);
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

export function getParent(geocodes, place) {
  const parents = [...place.parents];
  if (["E", "W"].includes(place.areacd[0])) parents.push({
    areacd: "K04000001",
    areanm: "England and Wales",
  });
  for (const parent of parents) {
    let typecd = parent.areacd.slice(0, 3);
    if (geocodes.includes(typecd)) {
      parent.groupcd = geoCodesLookup[typecd]?.key ? geoCodesLookup[typecd].key : "ew";
      return parent;
    };
  }
  return null;
}

// const validYear = (place, year) => !year || ((!place.start || place.start < year) && (!place.end || place.end > year));

export function filterLinks(links, place) {
  let thislinks = [];
  let parentlinks = [];
  links.forEach(l => {
    let parent = getParent(l.geocodes, place);
    if (
      l.geocodes.includes(place.typecd)
      // && validYear(place, l.year)
    ) {
      thislinks.push({...l, place});
    } else if (parent) {
      parentlinks.push({...l, place: getParent(l.geocodes, place)});
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
        output = output.replace(s, `<strong>${getName(place, context)}</strong>`);
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
    "K02", "E92", "N92", "S92", "W92",
    "E10", "E12", "E47",
    "E06", "E07", "E08", "E09", "N09", "S12", "W06",
    "E14", "N06", "S14", "W07"
  ].includes(code.slice(0, 3))) {
    return code + "/";
  } else {
    return "area/?code=" + code;
  }
}

export function filterChildren(place, type) {
  return place.children.filter(c => type.codes.includes(c.areacd.slice(0, 3)));
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

export function pluralise(str) {
  if (str.slice(-1) === "y") return str.slice(0, -1) + "ies";
  else return str + "s";
}