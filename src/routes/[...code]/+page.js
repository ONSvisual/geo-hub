import { getPlace } from "$lib/utils";
import { building } from '$app/environment';

export async function load({ fetch, params, parent }) {
	const stuff = await parent();
	let places = stuff.places;
	let lookup = stuff.lookup;
	let links = stuff.links;

	let code = params.code.replaceAll("/", "");

	let { place, type } = await getPlace(code, fetch);

  if (building) console.log(code);
	
  return { places, lookup, place, type, links };
}