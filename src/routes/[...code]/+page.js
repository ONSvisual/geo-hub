import { getPlace, getDatasets } from "$lib/utils";
import { building } from '$app/environment';
import { redirect } from "@sveltejs/kit";
import { redirectBase } from "$lib/config";

export async function load({ fetch, params, parent }) {
	const stuff = await parent();
	let links = stuff.links;

	let code = params.code.split("/")[0];

	let { place, type, geometry } = await getPlace(code, fetch);
	
	if (building) console.log(code);

	// if (place) throw redirect(301, `${redirectBase}/areas/${code}`);
	
	return { place, type, geometry, links};
}