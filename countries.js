// Visited countries (ISO 3166-1 alpha-3 codes)
const visitedCountries = [
  'USA', 'GBR', 'FRA', 'ESP', 'ITA', 'DEU', 'TUR', 'GRC',
  'MAR', 'TUN', 'SYR', 'JOR', 'HRV', 'SVN', 'AUT', 'HUN',
  'CZE', 'NLD', 'NOR', 'FIN', 'SWE', 'DNK', 'CHE', 'SMR',
  'VAT', 'LIE', 'BEL', 'ROU'
];

// Country centroid coordinates for flight arcs
const countryCoords = {
  'USA': { lat: 38, lng: -97 },
  'GBR': { lat: 54, lng: -2 },
  'FRA': { lat: 46, lng: 2 },
  'ESP': { lat: 40, lng: -4 },
  'ITA': { lat: 42.8333, lng: 12.8333 },
  'DEU': { lat: 51.5, lng: 10.5 },
  'TUR': { lat: 39, lng: 35 },
  'GRC': { lat: 39, lng: 22 },
  'MAR': { lat: 32, lng: -5 },
  'TUN': { lat: 34, lng: 9 },
  'SYR': { lat: 35, lng: 38 },
  'JOR': { lat: 31, lng: 36 },
  'HRV': { lat: 45.1667, lng: 15.5 },
  'SVN': { lat: 46, lng: 15 },
  'AUT': { lat: 47.3333, lng: 13.3333 },
  'HUN': { lat: 47, lng: 20 },
  'CZE': { lat: 49.75, lng: 15.5 },
  'NLD': { lat: 52.5, lng: 5.75 },
  'NOR': { lat: 62, lng: 10 },
  'FIN': { lat: 64, lng: 26 },
  'SWE': { lat: 62, lng: 15 },
  'DNK': { lat: 56, lng: 10 },
  'CHE': { lat: 47, lng: 8 },
  'SMR': { lat: 43.9333, lng: 12.4167 },
  'VAT': { lat: 41.9, lng: 12.45 },
  'LIE': { lat: 47.1667, lng: 9.5333 },
  'BEL': { lat: 50.8333, lng: 4 },
  'ROU': { lat: 46, lng: 25 }
};

// Home country for flight arc origin
const homeCountry = 'ITA';
