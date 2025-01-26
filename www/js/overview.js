// variables
var fields = [];
var owners = [];
var ownerColors = {};
var map = null;
// Load data from JSON file
const fetchData = () => {
    fetch(`./livemap.json?timestamp=${new Date().getTime()}`)
        .then(response => response.json())
        .then(data => {
            // get server data
            let serverData = data.find(item => item.type === 'server');
            let mapName = serverData ? serverData.mapName : 'Unknown';
            let mapSize = serverData ? serverData.mapSize : 100;
            let halfMapSize = mapSize / 2;
            // build map
            map = L.map('map', {
                crs: L.CRS.Simple,
                minZoom: -3,
                maxBounds: [[-halfMapSize, -halfMapSize], [halfMapSize, halfMapSize]]
            }).setView([0, 0], -3);
            // add map image
            L.imageOverlay('./images/maps/' + mapName.replace(/ /g, '_') + '.jpg',
                [[-halfMapSize, -halfMapSize], [halfMapSize, halfMapSize]]
            ).addTo(map);
            // get fields
            fields = data.filter(item => item.type === 'field').map(item => ({
                type: 'Feature',
                properties: {
                    id: item.farmland,
                    owner: item.farmlandOwner,
                    popup: "Field " + item.farmland + (item.farmlandOwner ? ` (${item.farmlandOwner})` : "")
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: item.polygons
                }
            }));
            // Transform the coordinates of the fields
            fields.forEach(field => {
                field.geometry.coordinates[0] = transformCoordinates(field.geometry.coordinates[0]);
            });
            // Get unique owners and assign colors
            owners = [...new Set(fields.map(field => field.properties.owner))];
            ownerColors = {};
            // Assign gray color to fields
            owners.forEach((owner, index) => {
                ownerColors[owner] = generateColor(index);
            });
            ownerColors[null] = '#808080';
            // Add fields to the map with individual colors for each owner
            let geoJSON = L.geoJSON(fields, {
                style: function(feature) {
                    return { color: ownerColors[feature.properties.owner] };
                }
            }).addTo(map);
            // add data to polygons
            geoJSON.eachLayer(function (layer) {
                // add tooltop
                layer.bindTooltip(layer.feature.properties.popup);
                // add label of field ID
                const center = layer.getBounds().getCenter();
                L.marker(center, {
                    icon: L.divIcon({
                        className: 'map-marker-field-id',
                        html: layer.feature.properties.id,
                        iconSize: [10, 10]
                    })
                }).addTo(map);
            });
        })
        .catch(error => console.error('Error loading fields:', error));
};

// Initial fetch
fetchData();

// Optionally, set an interval to refresh the data periodically
setInterval(fetchData, 60000); // Refresh every 60 seconds

// Function to transform coordinates by rotating 180 degrees and mirroring on the x-axis
function transformCoordinates(coords) {
    return coords.map(function(coord) {
        return [coord[0], -coord[1]];
    });
}

// Function to generate a color based on an index
function generateColor(index) {
    const hue = (index * 137.508) % 360; // Use golden angle approximation
    return `hsl(${hue}, 100%, 50%)`;
}
