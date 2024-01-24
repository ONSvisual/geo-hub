export default function pivotData(data, filter = null) {
  const piv = {};

  for (const d of data) {
    if (!filter || filter.includes(d.areacd.slice(0, 3))) {
      if (!piv[d.areacd]) piv[d.areacd] = {areacd: d.areacd, areanm: d.areanm};
      piv[d.areacd][d.year] = d.value;
    }
  }

  return Object.keys(piv).map(key => piv[key]).sort((a, b) => a.areanm.localeCompare(b.areanm));
}