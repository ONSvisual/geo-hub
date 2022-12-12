import { csvParse, autoType } from "d3-dsv";
import { feature } from "topojson-client";

export async function getData(url, fetch = window.fetch) {
  let res = await fetch(url);
  let str = await res.text();
  let data = csvParse(str, autoType);
  let cols = data.columns.filter(c => data[0][c].includes("|"));
  data.forEach((d, i) => {
    cols.forEach(col => {
      d[col] = d[col].split("|");
    });
  });
  return data;
}

export function getName(props, context = null) {
  let name = props.hclnm ? props.hclnm : props.areanm ? props.areanm : props.areacd;
  let island = name.startsWith("Isle");
  let region = props.areacd.slice(0,3) === "E12" && !["E12000003", "E12000007"].includes(props.areacd);
  name = name.replace("&", "and");
  if (["in","the"].includes(context)) {
    if (island || region) name = "the " + name;
  }
  if (context === "in") {
    if (island) name = "on " + name;
    else name = "in " + name;
  }
  return name;
}

export function getParent(geocodes, parents) {
  for (const parent of parents) {
    if (geocodes.includes(parent.areacd.slice(0, 3))) {
      return [parent];
    };
  }
  return [];
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
  if (!str.startsWith('unit') && ['a', 'e', 'i', 'o', 'u'].includes(str.slice(0, 1).toLowerCase())) {
    return "an " + str;
  } else {
    return "a " + str;
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