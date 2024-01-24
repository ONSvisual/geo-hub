import ckmeans from "ckmeans";

function getBreak(breaks, value) {
	for (let i = 0; i < breaks.length - 2; i ++) {
		if (value < breaks[i + 1]) return i;
	}
	return breaks.length - 2;
}

export default function makeMapData(data, types, year) {
	const filtered = data
		.filter(d => d.value && d.year === year && types.includes(d.areacd.slice(0, 3)));
	const values = filtered.map(d => d.value).sort((a, b) => a - b);
	const breaks = [...ckmeans(values, Math.min(values.length, 5)), values[values.length - 1]];
	const codes = [];
	for (const d of filtered) {
		d.cluster = getBreak(breaks, d.value);
		codes.push(d.areacd);
	}
	return {data: filtered, breaks, codes};
}