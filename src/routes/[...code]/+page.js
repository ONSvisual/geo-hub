import { getPlace, getDatasets } from "$lib/utils";
import { building } from '$app/environment';

export async function load({ fetch, params, parent }) {
	const stuff = await parent();
	let links = stuff.links;

	let code = params.code.split("/")[0];

	let { place, type, geometry } = await getPlace(code, fetch);
	
	if (building) console.log(code);

	console.log(place.areanm)
	
	return { place, type, geometry, links};
}