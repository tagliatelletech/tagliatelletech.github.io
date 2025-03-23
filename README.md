# Countries Visited Map

A simple web application that displays a world map highlighting the countries you have visited, with a counter in the top right corner.

## Features

- Interactive world map using Leaflet
- Countries you've visited are highlighted in green
- Counter showing the total number of countries visited
- Hover over any country to see its name and visited status

## How to Use

1. Clone this repository to your local machine or download the files
2. Edit the `visitedCountries` array in `index.html` to include the countries you have visited (using ISO 3166-1 alpha-3 codes)
3. Open `index.html` in your web browser to view the map
4. To deploy to GitHub Pages, push these files to your GitHub repository with the name `yourusername.github.io`

## Customization

- Change the map style by modifying the tile layer URL in `index.html`
- Adjust the highlight color for visited countries by changing the color code in the `getColor` function
- Modify the styling of the counter and info box in the CSS section

## Dependencies

- [Leaflet](https://leafletjs.com/) - for the interactive map
- [GeoJSON data](https://github.com/datasets/geo-countries) - for country boundaries

## License

This project is open source and available under the [MIT License](LICENSE).