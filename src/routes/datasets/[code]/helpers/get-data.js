import { csvParse } from "d3-dsv";

export default async function getData(dataUrl, areaUrl, indicator, fetch = window.fetch) {
  const codes = [];
  const years = [];
  const areas = csvParse(await (await fetch(areaUrl)).text());
  const areasLkp = (() => {
    const lkp = {};
    for (const area of areas) lkp[area.areacd] = area.areanm;
    return lkp;
  })();

  const data = csvParse(await (await fetch(dataUrl)).text(), (d) => {
    if (+d.id === +indicator.id) {
      const areacd = d.areacd;
      const areanm = areasLkp[areacd] || "Unknown area";
      const year = +d.xDomainNumb;
      const value = +d.value;
      if (!codes.includes(areacd)) codes.push(areacd);
      if (!years.includes(year)) years.push(year);
      return {areacd, areanm, year, value};
    }
    else return null;
  });
  data.columns = ["areacd", "areanm", "year", "value"];
  
  return {data, codes, years: [...years].sort((a, b) => a - b)};
}