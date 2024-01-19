import { getPlace, getDatasets } from "$lib/utils";
import { building } from '$app/environment';

export async function load({ fetch, params, parent }) {
	const { links } = await parent();

	const code = params.code;
	const { place, type, geometry } = await getPlace(code, fetch);
	
	if (building) console.log(code);
	
	return { place, type, geometry, links };
}