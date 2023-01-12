export const assets = "https://www.ons.gov.uk/visualisations/areas";
export const cdnUrl = "https://cdn.ons.gov.uk/maptiles/ap-geos/v1";

export const geoNames = {
  "E06": {label: "unitary authority", plural: "unitary authorities"},
  "W06": {label: "unitary authority", plural: "unitary authorities"},
  "E07": {label: "non-metropolitan district", plural: "non-metropolitan districts"},
  "E08": {label: "metropolitan district", plural: "metropolitan districts"},
  "E09": {label: "borough", plural: "boroughs"},
  "E10": {label: "county", plural: "counties"},
  "E11": {label: "metropolitan county", plural: "metropolital counties"}
};

export const geoTypes = [
	{
    key: "ew",
    codes: ["K04"],
    source: {
      type: "geojson",
      promoteId: "areacd"
    }
  },
	{
    key: "ctry",
    codes: ["E92", "W92"],
    pcio: "country",
    label: "country",
    plural: "countries",
    source: {
      type: "geojson",
      promoteId: "areacd"
    }
  },
	{
    key: "rgn",
    codes: ["E12"],
    pcio: "region",
    label: "region",
    plural: "regions",
    source: {
      type: "geojson",
      promoteId: "areacd"
    }
  },
	{
    key: "cty",
    codes: ["E10", "E11", "E06", "W06", "E09"],
    pcio: "admin_county",
    label: "county/unitary authority",
    plural: "counties/unitary authorities",
    source: {
      type: "vector",
      url: "https://cdn.ons.gov.uk/maptiles/administrative/2021/cty/v1/boundaries/{z}/{x}/{y}.pbf",
      promoteId: "areacd",
      minzoom: 4
    }
  },
	{
    key: "lad",
    codes: ["E06", "E07", "E08", "E09", "W06"],
    pcio: "admin_district",
    label: "district",
    plural: "districts",
    source: {
      type: "vector",
      url: "https://cdn.ons.gov.uk/maptiles/administrative/2021/authorities-ew/v2/boundaries/{z}/{x}/{y}.pbf",
      promoteId: "areacd",
      minzoom: 4
    }
  },
  {
    key: "wpc",
    codes: ["E14", "W07"],
    pcio: "parliamentary_constituency",
    label: "parliamentary constituency",
    plural: "parliamentary constituencies",
    source: {
      type: "vector",
      url: "https://cdn.ons.gov.uk/maptiles/administrative/2010/wpc/v1/boundaries/{z}/{x}/{y}.pbf",
      promoteId: "areacd",
      minzoom: 4
    }
  },
	{
    key: "wd",
    codes: ["E05", "W05"],
    pcio: "admin_ward",
    label: "ward",
    plural: "wards",
    source: {
      type: "vector",
      url: "https://cdn.ons.gov.uk/maptiles/administrative/2022/wd/v1/boundaries/{z}/{x}/{y}.pbf",
      promoteId: "areacd",
      minzoom: 6
    }
  },
	{
    key: "par",
    codes: ["E04", "W04"],
    pcio: "parish",
    label: "parish",
    plural: "parishes",
    source: {
      type: "vector",
      url: "https://cdn.ons.gov.uk/maptiles/administrative/2022/par/v1/boundaries/{z}/{x}/{y}.pbf",
      promoteId: "areacd",
      minzoom: 6
    }
  },
	{
    key: "msoa",
    codes: ["E02", "W02"],
    pcio: "msoa",
    label: "MSOA",
    plural: "MSOAs",
    source: {
      type: "vector",
      url: "https://cdn.ons.gov.uk/maptiles/administrative/2021/msoa/v2/boundaries/{z}/{x}/{y}.pbf",
      promoteId: "areacd",
      minzoom: 6
    }
  },
	{
    key: "lsoa",
    codes: ["E01", "W01"],
    pcio: "lsoa",
    label: "LSOA",
    plural: "LSOAs",
    source: {
      type: "vector",
      url: "https://cdn.ons.gov.uk/maptiles/administrative/2021/lsoa/v2/boundaries/{z}/{x}/{y}.pbf",
      promoteId: "areacd",
      minzoom: 7
    }
  },
	{
    key: "oa",
    codes: ["E00", "W00"],
    label: "output area",
    plural: "output areas",
    source: {
      type: "vector",
      url: "https://cdn.ons.gov.uk/maptiles/administrative/2021/oa/v2/boundaries/{z}/{x}/{y}.pbf",
      promoteId: "areacd",
      minzoom: 8
    }
  }
];

export const geoCodesLookup = (() => {
	let lookup = {};
	geoTypes.forEach(g => g.codes.forEach(k => lookup[k] = g));
	return lookup;
})();

export const geoTypesLookup = (() => {
	let lookup = {};
	geoTypes.forEach(g => lookup[g.key] = g);
	return lookup;
})();

export const geoReverseLookup = {
  "England": "E92000001",
  "Wales": "W92000004",
  "North East": "E12000001",
  "North West": "E12000002",
  "Yorkshire and The Humber": "E12000003",
  "East Midlands": "E12000004",
  "West Midlands": "E12000005",
  "East of England": "E12000006",
  "London": "E12000007",
  "South East": "E12000008",
  "South West": "E12000009",
};