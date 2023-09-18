import * as d3 from "d3-dsv";
import { feature } from "topojson-client";
import { getName } from "@onsvisual/robo-utils";
import { cdnUrl, geoCodesLookup, geoTypesLookup, geoNames, geoTypes, noIndex } from "$lib/config";

const csvParse = (str, row = d3.autoType) => d3.csvParse(str.replace(/\uFEFF/, ""), row);

export const slugify = (str) =>
  str
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

export async function getData(url, fetch = window.fetch) {
  let res = await fetch(url);
  let str = await res.text();
  let data = csvParse(str);
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

const validYear = (place, year) => !year || ((!place.start || year > place.start) && (!place.end || year <= place.end));

export function getParent(link, place) {
  const parents = [...place.parents];
  if (["E", "W"].includes(place.areacd[0])) parents.push({
    areacd: "K04000001",
    areanm: "England and Wales",
  });
  for (const parent of parents) {
    let typecd = parent.areacd.slice(0, 3);
    if (link.geocodes.includes(typecd) && validYear(parent, link.year)) {
      parent.groupcd = geoCodesLookup[typecd]?.key ? geoCodesLookup[typecd].key : "ew";
      return parent;
    };
  }
  return null;
}

export function filterLinks(links, place) {
  let thislinks = [];
  let parentlinks = [];
  links.forEach(l => {
    let parent = getParent(l, place);
    if (
      l.geocodes.includes(place.typecd)
      && validYear(place, l.year)
    ) {
      thislinks.push({...l, place});
    } else if (parent) {
      parentlinks.push({...l, place: getParent(l, place)});
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
        output = output.replace(s, `${getName(place, context, "prefix")} <strong>${getName(place)}</strong>`);
      } else {
        output = output.replace(s, place[s.slice(1,-1)]);
      }
    });
  }
  
  return output;
}

export async function getDatasets(code, fetch = window.fetch) {
  const api = "https://beta.gss-data.org.uk/sparql";
  const sparql = encodeURIComponent(`PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX pmdcat: <http://publishmydata.com/pmdcat#>

SELECT DISTINCT ?label ?topic ?description ?description_md ?uri
WHERE {
    ?geo ?match <http://statistics.data.gov.uk/id/statistical-geography/${code}> .
    ?geo_uri rdfs:label "Statistical Geography"@en .
    ?obs rdf:type qb:Observation ;
          ?geo_uri ?geo ;
          qb:dataSet ?datasetUri .
    ?uri pmdcat:datasetContents ?datasetUri ;
          dcat:keyword "subnational"@en ;
          rdfs:label ?label ;
          rdfs:comment ?description ;
          pmdcat:markdownDescription ?description_md ;
          dcat:theme ?topicUri .
    ?topicUri rdfs:label ?topic .
  FILTER (?match in (skos:exactMatch, owl:sameAs))
}`);
  const url = `${api}?query=${sparql}`;
  const datasets = csvParse(await (await fetch(url)).text(), (row) => {
    const source_str = row.description_md
      .match(/(?<=###\sSource\n\n)(.*?)(?=\n\n)/s)?.[0]
      ?.replace(/\(.*?\)|\[|\]/gm, "") || null;
    row.sources = source_str.match(/(?<=:\s)(.*?)(?=\s$)/gm);
    return row;
  });
  if (!datasets[0]) return {topics: null, datasets: null};
  datasets.sort((a, b) => a.label.localeCompare(b.label));
  const topics = Array.from(new Set(datasets.map(d => d.topic)))
    .sort((a, b) => a.localeCompare(b))
    .map(t => ({key: slugify(t), label: t}));
  return {topics, datasets};
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
  if (!noIndex.includes(code.slice(0, 3))) {
    return code + "/";
  } else {
    return "area/?code=" + code;
  }
}

export function filterChildren(place, type) {
  const labelKey = type.key === "msoa" ? "hclnm" : type.key  === "oa" ? "areacd" : "areanm";
  return place.children.filter(c => type.codes.includes(c.areacd.slice(0, 3)))
    .sort((a, b) => a[labelKey].localeCompare(b[labelKey]));
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