export async function load({ params, parent }) {
	const data = await parent();

	const code = params.code;
  const indicator = data.indicators.find(ind => ind.code === code);
	
	return { ...data, indicator };
}