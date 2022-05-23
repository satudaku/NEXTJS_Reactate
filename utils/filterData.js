// Filters used in property search page
// has the filter name, value, placeholder, and query.
export const filterData = [
  {
    items: [
      { name: "", value: "" },
      { name: "Buy", value: "for-sale" },
      { name: "Rent", value: "for-rent" },
    ],
    placeholder: "Purpose",
    queryName: "purpose",
  },
  {
    items: [
      { name: "Any", value: "" },
      { name: "Daily", value: "daily" },
      { name: "Weekly", value: "weekly" },
      { name: "Monthly", value: "monthly" },
      { name: "Yearly", value: "yearly" },
    ],
    placeholder: "Rent Frequency",
    queryName: "rentFrequency",
  },
  {
    items: [
      { name: "0", value: "0" },
      { name: "10,000", value: "10000" },
      { name: "20,000", value: "20000" },
      { name: "30,000", value: "30000" },
      { name: "40,000", value: "40000" },
      { name: "50,000", value: "50000" },
      { name: "60,000", value: "60000" },
      { name: "85,000", value: "85000" },
      { name: "100,000", value: "100000" },
      { name: "200,000", value: "200000" },
      { name: "500,000", value: "500000" },
      { name: "750,000", value: "750000" },
      { name: "1,000,000", value: "1000000" },
    ],
    placeholder: "Min Price(AED)",
    queryName: "minPrice",
  },
  {
    items: [
      { name: "Any", value: "" },
      { name: "50,000", value: "50000" },
      { name: "75,000", value: "75000" },
      { name: "100,000", value: "100000" },
      { name: "150,000", value: "150000" },
      { name: "200,000", value: "200000" },
      { name: "300,000", value: "300000" },
      { name: "500,000", value: "500000" },
      { name: "800,000", value: "800000" },
      { name: "1,000,000", value: "1000000" },
    ],
    placeholder: "Max Price(AED)",
    queryName: "maxPrice",
  },
  {
    items: [
      { name: "", value: "" },
      { name: "Lowest Price", value: "price-asc" },
      { name: "Highest Price", value: "price-desc" },
      { name: "Newest", value: "date-desc" },
      { name: "Oldest", value: "date-asc" },
      { name: "Verified", value: "verified-score" },
      { name: "City Level Score", value: "city-level-score" },
    ],
    placeholder: "Sort",
    queryName: "sort",
  },
  {
    items: [
      { name: "0", value: "0" },
      { name: "25", value: "25" },
      { name: "50", value: "50" },
      { name: "75", value: "75" },
      { name: "100", value: "100" },
      { name: "200", value: "200" },
      { name: "500", value: "500" },
      { name: "1000", value: "1000" },
    ],
    placeholder: "Min Area (sq.m.)",
    queryName: "areaMin",
  },
  {
    items: [
      { name: "Any", value: "" },
      { name: "50", value: "50" },
      { name: "100", value: "100" },
      { name: "200", value: "200" },
      { name: "500", value: "500" },
      { name: "1000", value: "1000" },
      { name: "2000", value: "2000" },
    ],
    placeholder: "Max Area (sq.m.)",
    queryName: "areaMax",
  },
  {
    items: [
      { name: "Any", value: "" },
      { name: "Studio", value: "0" },
      { name: "1", value: "1" },
      { name: "2", value: "2" },
      { name: "3", value: "3" },
      { name: "4", value: "4" },
      { name: "5", value: "5" },
      { name: "6", value: "6" },
      { name: "7", value: "7" },
      { name: "8", value: "8" },
      { name: "9", value: "9" },
      { name: "10", value: "10" },
    ],
    placeholder: "Rooms",
    queryName: "roomsMin",
  },
  {
    items: [
      { name: "Any", value: "" },
      { name: "1", value: "1" },
      { name: "2", value: "2" },
      { name: "3", value: "3" },
      { name: "4", value: "4" },
      { name: "5", value: "5" },
      { name: "6", value: "6" },
      { name: "7", value: "7" },
      { name: "8", value: "8" },
      { name: "9", value: "9" },
      { name: "10", value: "10" },
    ],
    placeholder: "Baths",
    queryName: "bathsMin",
  },
  {
    items: [
      { name: "Any", value: "" },
      { name: "Furnished", value: "furnished" },
      { name: "Unfurnished", value: "unfurnished" },
    ],
    placeholder: "Furnishing",
    queryName: "furnishingStatus",
  },
  {
    items: [
      { name: "Any", value: "" },
      { name: "Apartment", value: "4" },
      { name: "Townhouses", value: "16" },
      { name: "Villas", value: "3" },
      { name: "Penthouses", value: "18" },
      { name: "Hotel Apartments", value: "21" },
      { name: "Villa Compound", value: "19" },
      { name: "Residential Plot", value: "14" },
      { name: "Residential Floor", value: "12" },
      { name: "Residential Building", value: "17" },
    ],
    placeholder: "Property Type",
    queryName: "categoryExternalID",
  },
];

// Assign each filter value into array
// That will be used on router.push to get filtered results
export const getFilterValues = (filterValues) => {
  const {
    purpose,
    rentFrequency,
    categoryExternalID,
    minPrice,
    maxPrice,
    areaMax,
    areaMin,
    roomsMin,
    bathsMin,
    sort,
    locationExternalIDs,
  } = filterValues;

  const values = [
    {
      name: "purpose",
      value: purpose,
    },
    {
      name: "rentFrequency",
      value: rentFrequency,
    },
    {
      name: "minPrice",
      value: minPrice,
    },
    {
      name: "maxPrice",
      value: maxPrice,
    },
    {
      name: "areaMin",
      value: areaMin,
    },
    {
      name: "areaMax",
      value: areaMax,
    },
    {
      name: "roomsMin",
      value: roomsMin,
    },
    {
      name: "bathsMin",
      value: bathsMin,
    },
    {
      name: "sort",
      value: sort,
    },
    {
      name: "locationExternalIDs",
      value: locationExternalIDs,
    },
    {
      name: "categoryExternalID",
      value: categoryExternalID,
    },
  ];

  return values;
};
