// Lightweight TopoJSON data source (~300KB vs 23MB)
const TOPOJSON_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Country code mapping (world-atlas uses numeric codes as strings)
const countryCodeMap = {
  '840': 'USA', '826': 'GBR', '250': 'FRA', '724': 'ESP', '380': 'ITA',
  '276': 'DEU', '792': 'TUR', '300': 'GRC', '504': 'MAR', '788': 'TUN',
  '760': 'SYR', '400': 'JOR', '191': 'HRV', '705': 'SVN', '040': 'AUT',
  '348': 'HUN', '203': 'CZE', '528': 'NLD', '578': 'NOR', '246': 'FIN',
  '752': 'SWE', '208': 'DNK', '756': 'CHE', '674': 'SMR', '336': 'VAT',
  '438': 'LIE', '056': 'BEL', '642': 'ROU'
};

// Globe texture URLs
const TEXTURES = {
  earth: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg',
  sky: '//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png'
};

// Colors
const COLORS = {
  visited: '#4CAF50',
  unvisited: 'rgba(200, 200, 200, 0.3)',
  arcGradient: ['#4CAF50', '#81C784'],
  background: '#000011'
};

// Check WebGL support
if (!window.WebGLRenderingContext) {
  document.getElementById('loading').innerHTML =
    '<span class="error">WebGL is not supported.<br>Please use a modern browser.</span>';
  throw new Error('WebGL not supported');
}

// Initialize globe with performance settings
const globe = new Globe(document.getElementById('globeViz'))
  .globeImageUrl(TEXTURES.earth)
  .backgroundImageUrl(TEXTURES.sky)
  .backgroundColor(COLORS.background)
  .showAtmosphere(true)
  .atmosphereColor('lightskyblue')
  .atmosphereAltitude(0.15);

// Update counter
document.getElementById('count').textContent = visitedCountries.length;

// Check if country is visited (handles both numeric and ISO codes)
function isVisited(feature) {
  const numericId = feature.id || feature.properties?.id;
  const isoCode = countryCodeMap[numericId];
  return isoCode && visitedCountries.includes(isoCode);
}

// Get country name
function getCountryName(feature) {
  return feature.properties?.name || 'Unknown';
}

// Generate flight arcs from home country
function generateArcs() {
  const home = countryCoords[homeCountry];
  if (!home) return [];

  return visitedCountries
    .filter(c => c !== homeCountry && countryCoords[c])
    .map(country => ({
      startLat: home.lat,
      startLng: home.lng,
      endLat: countryCoords[country].lat,
      endLng: countryCoords[country].lng,
      color: COLORS.arcGradient
    }));
}

// Load country data and configure globe
fetch(TOPOJSON_URL)
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch TopoJSON');
    return res.json();
  })
  .then(world => {
    // Hide loading indicator
    document.getElementById('loading').style.display = 'none';

    // Convert TopoJSON to GeoJSON
    const countries = topojson.feature(world, world.objects.countries);

    // Configure polygon layer (static styling - no expensive hover recalculation)
    globe
      .polygonsData(countries.features)
      .polygonCapColor(feat => isVisited(feat) ? COLORS.visited : COLORS.unvisited)
      .polygonSideColor(() => 'rgba(100, 100, 100, 0.1)')
      .polygonStrokeColor(() => '#333')
      .polygonAltitude(feat => isVisited(feat) ? 0.02 : 0.005)
      .polygonLabel(feat => {
        const name = getCountryName(feat);
        const visited = isVisited(feat);
        return `
          <div style="
            text-align: center;
            padding: 8px 12px;
            background: rgba(0,0,0,0.8);
            border-radius: 6px;
            font-family: 'Segoe UI', Arial, sans-serif;
          ">
            <b style="font-size: 14px;">${name}</b>
            ${visited ? '<br/><span style="color: #4CAF50; font-size: 12px;">✓ Visited</span>' : ''}
          </div>
        `;
      })
      .polygonsTransitionDuration(0);  // No transition animations

    // Configure arc layer (keep animations as requested)
    globe
      .arcsData(generateArcs())
      .arcColor('color')
      .arcAltitudeAutoScale(0.4)
      .arcStroke(0.5)
      .arcDashLength(0.9)
      .arcDashGap(0.2)
      .arcDashAnimateTime(3000)
      .arcsTransitionDuration(0);

    // Enable auto-rotation
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;

    // Pause rotation on interaction, resume after idle
    let idleTimeout;
    globe.controls().addEventListener('start', () => {
      globe.controls().autoRotate = false;
      clearTimeout(idleTimeout);
    });

    globe.controls().addEventListener('end', () => {
      idleTimeout = setTimeout(() => {
        globe.controls().autoRotate = true;
      }, 3000);
    });

    // Set initial camera position (view Europe)
    globe.pointOfView({ lat: 45, lng: 10, altitude: 2.5 }, 1000);
  })
  .catch(error => {
    console.error('Error loading data:', error);
    document.getElementById('loading').innerHTML =
      '<span class="error">Error loading globe data.<br>Please refresh the page.</span>';
  });

// Handle window resize
window.addEventListener('resize', () => {
  globe.width(window.innerWidth);
  globe.height(window.innerHeight);
});
