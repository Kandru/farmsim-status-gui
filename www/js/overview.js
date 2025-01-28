// variables
var map = null;
var farmsColors = {};
// network data
var serverData = {};
var farmsData = {};
var farmlandsData = {};

// fetch server
function getServerData() {
    return fetch(`./server.json?timestamp=${new Date().getTime()}`)
        .then(response => response.json())
        .then(data => {serverData = data;})
        .catch(error => console.error('error loading server:', error));
}
// fetch farms
function getFarmsData() {
    return fetch(`./farms.json?timestamp=${new Date().getTime()}`)
        .then(response => response.json())
        .then(data => {farmsData = data;})
        .catch(error => console.error('error loading farms:', error));
}
// fetch farmlands
function getFarmlandsData() {
    return fetch(`./farmlands.json?timestamp=${new Date().getTime()}`)
        .then(response => response.json())
        .then(data => {farmlandsData = data;})
        .catch(error => console.error('error loading farmlands:', error));
}

// Function to generate a color based on an index
function generateColor(index) {
    const hue = (index * 137.508) % 360; // Use golden angle approximation
    return `hsl(${hue}, 100%, 50%)`;
}

function generateMap() {
    // get data
    Promise.all([getServerData(), getFarmsData(), getFarmlandsData()])
    .then(() => {
        // check if data is missing
        if (!serverData.map
            || !serverData.map.name
            || !serverData.map.size
            || !serverData.map.width
            || !serverData.map.height)
            {
                // TODO: GUI error message
                return;
            }
        // create map
        map = L.map('map', {
            crs: L.CRS.Simple,
            minZoom: -5,
            // TODO: use width and height but seem to be wrong currently
            maxBounds: [[-(serverData.map.size / 2), -(serverData.map.size / 2)], [(serverData.map.size / 2), (serverData.map.size / 2)]]
        }).setView([0, 0], -5);
        // add map image
        L.imageOverlay('./images/maps/' + serverData.map.name.replace(/ /g, '_') + '.jpg',
            // TODO: use width and height but seem to be wrong currently
            [[-(serverData.map.size / 2), -(serverData.map.size / 2)], [(serverData.map.size / 2), (serverData.map.size / 2)]]
        ).addTo(map);
        // get farmlands
        let farmlands = Object.values(farmlandsData)
            .filter(entry => entry.polygons !== null && entry.polygons !== undefined)
            .map(entry => ({
            type: 'Feature',
            properties: {
            id: entry.id,
            owner: entry.farmId,
            popup: "Field " + entry.id + (entry.farmId > 0 ? ` (${entry.farmId})` : "")
            },
            geometry: {
            type: 'Polygon',
            coordinates: [Object.values(entry.polygons).map(coord => [parseFloat(coord.x), -parseFloat(coord.y)])]
            }}));
        // Get unique owners and assign colors
        let farmOwners = [...new Set(farmlands.map(field => field.properties.owner))];
        farmsColors = {};
        // Assign gray color to fields
        farmOwners.forEach((owner, index) => {
            farmsColors[owner] = generateColor(index);
        });
        farmsColors[0] = '#808080';
        // Add fields to the map with individual colors for each owner
        let geoJSON = L.geoJSON(farmlands, {
            style: function(farmland) {
                return { color: farmsColors[farmland.properties.owner] };
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
        return;
    })
    .catch(error => console.error('error loading data:', error));
}

// generate map
generateMap();
// Optionally, set an interval to refresh the data periodically
//setInterval(updateMap, 60000); // Refresh every 60 seconds
