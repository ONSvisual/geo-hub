const prerender = false;

import { cdnUrl } from "$lib/config";
import { getData } from "$lib/utils";
  
export async function load({ fetch }) {
	let places = await getData(`${cdnUrl}/places-list.csv`, fetch);
	places.sort((a, b) => a.areanm.localeCompare(b.areanm));
	let lookup = {};
	places.forEach(d => lookup[d.areacd] = d);

	return { places, lookup };
}
