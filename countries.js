// This is a placeholder for the GeoJSON data
// The actual data is quite large, so we'll load a simplified version
// You can replace this with the full GeoJSON data from Natural Earth or other sources

const countriesData = {
  "type": "FeatureCollection",
  "features": []
};

// Load the actual GeoJSON data when the page loads
fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
  .then(response => response.json())
  .then(data => {
    // Copy the data to our variable
    Object.assign(countriesData, data);
    
    // Refresh the map with the new data
    geojson.clearLayers();
    geojson.addData(data);
  })
  .catch(error => console.error('Error loading GeoJSON data:', error));