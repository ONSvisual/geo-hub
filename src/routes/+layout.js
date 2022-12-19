const prerender = false;

import { base } from "$app/paths";
import { cdnUrl, geoCodesLookup, geoNames } from "$lib/config";
import { getData, capitalise } from "$lib/utils";

const getTypeLabel = (type) => geoNames[type] ? geoNames[type].label : geoCodesLookup[type].label;
  
export async function load({ fetch }) {
	let places = await getData(`${base}/data/csv/places.csv`, fetch);
	places.sort((a, b) => a.areanm.localeCompare(b.areanm));
	let lookup = {};
	places.forEach(d => lookup[d.areacd] = d);
	places.forEach(d => {
		let type = d.areacd.slice(0, 3);
		d.group = type === "K04" ? "" :
      d.parent ? `${capitalise(getTypeLabel(type))} in ${lookup[d.parent].areanm}` :
      capitalise(getTypeLabel(type));
	});
  let links = await getData(`${base}/data/csv/links.csv`, fetch);
  links.forEach((link, i) => {
    if (link.image && !link.image.startsWith("http")) links[i].image = base + link.image;
  });

	return { places, lookup, links };
}
