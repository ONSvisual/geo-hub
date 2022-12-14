import { getPlace } from "$lib/utils";

export async function load({ fetch, params, parent }) {
	const stuff = await parent();
	let places = stuff.places;
	let lookup = stuff.lookup;
	let links = stuff.links;

	let code = params.code.replaceAll("/", "");

	let { place, type } = await getPlace(code, fetch);
	
  return { places, lookup, place, type, links };
}