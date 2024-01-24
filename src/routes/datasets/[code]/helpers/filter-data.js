export default function filterData(data, types, year = null) {
	return data.filter(d => d.value && (!year || d.year === year) && types.includes(d.areacd.slice(0, 3)))
		.sort((a, b) => a.year - b.year);
}