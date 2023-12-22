import { PUBLIC_APP_PATH } from '$env/static/public';

export const prerender = !(PUBLIC_APP_PATH && PUBLIC_APP_PATH.includes("github"));
export const trailingSlash = 'always';

import { base } from "$app/paths";
import { getData } from "$lib/utils";
  
export async function load({ fetch }) {
  let links = await getData(`${base}/data/csv/links.csv`, fetch);
  links.forEach((link, i) => {
    if (link.image && !link.image.startsWith("http")) links[i].image = base + link.image;
  });

	return { links };
}
