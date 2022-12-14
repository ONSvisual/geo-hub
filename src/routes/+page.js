export async function load({ parent }) {
	const stuff = await parent();
	let places = stuff.places;
	let lookup = stuff.lookup;
	
  return { places, lookup };
}