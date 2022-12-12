import { cdnUrl, geoCodesLookup, geoTypesLookup, geoNames } from "$lib/config";

export async function load({ fetch, params, parent }) {
	const stuff = await parent();
	let places = stuff.places;
	let lookup = stuff.lookup;
	let links = stuff.links;

	let place = null;
	let type = null;

	let code = params.code.replaceAll("/", "");
	if (code.length === 9) {
		let typeCode = code.slice(0, 3);
		let res = await fetch(`${cdnUrl}/${typeCode}/${code}.json`);
		let json = await res.json();

		if (geoNames[typeCode]) json.properties.typenm = geoNames[typeCode].label; 
		let childCodes = json.properties.children[0] ?
				Array.from(new Set(json.properties.children.map(d => d.areacd.slice(0, 3)))) : null;
		json.properties.childTypes = childCodes ? Array.from(new Set(childCodes.map(c => geoCodesLookup[c]))) : [];
		if (typeCode === "E12") {
			json.properties.childTypes = json.properties.childTypes.filter(c => c.key !== "lad");
			if (code === "E12000007") {
				json.properties.childTypes = [
					{
						key: "lad",
						codes: ["E09"],
						label: "borough",
						plural: "boroughs"
					},
					...json.properties.childTypes
				];
			}
		} 

		place = json.properties;
		type = geoCodesLookup[typeCode];
	}
	
  return { places, lookup, place, type, links }
}