import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

export async function load() {
  throw redirect(301, `${base}/`);
}