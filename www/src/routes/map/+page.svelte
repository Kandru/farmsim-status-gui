<script lang="ts">
    import { onMount } from 'svelte';
    import 'leaflet/dist/leaflet.css';

    function generateColor(index: number) {
        const hue = (index * 137.508) % 360; // Use golden angle approximation
        return `hsl(${hue}, 100%, 50%)`;
    }

    let map: any;
    let serverData: any;
    let farmlandsData: any;

    onMount(async () => {
        const L = await import('leaflet');
        let farmsColors: { [key: number]: string } = {};
        let response = await fetch('/data/server.json');
        serverData = await response.json();
        response = await fetch('/data/farmlands.json');
        farmlandsData = await response.json();

        if (serverData.map
            && serverData.map.name
            && serverData.map.size
            && serverData.map.width
            && serverData.map.height) {
            map = L.map('map', {
                crs: L.CRS.Simple,
                minZoom: -5,
                maxBounds: [[-(serverData.map.size / 2), -(serverData.map.size / 2)], [(serverData.map.size / 2), (serverData.map.size / 2)]]
            }).setView([0, 0], -5);

            L.imageOverlay('/images/maps/' + serverData.map.name.replace(/ /g, '_') + '.jpg',
                [[-(serverData.map.size / 2), -(serverData.map.size / 2)], [(serverData.map.size / 2), (serverData.map.size / 2)]]
            ).addTo(map);

            let farmlands: GeoJSON.Feature[] = Object.values(farmlandsData)
                .filter((entry: any) => entry.polygons !== null && entry.polygons !== undefined)
                .map((entry: any) => ({
                    type: 'Feature',
                    properties: {
                        id: entry.id,
                        owner: entry.farmId,
                        popup: "Field " + entry.id + (entry.farmId > 0 ? ` (${entry.farmId})` : "")
                    },
                    geometry: {
                        type: 'Polygon',
                        coordinates: [Object.values(entry.polygons).map((coord: any) => [parseFloat(coord.x), -parseFloat(coord.y)])]
                    }
                }));

            let farmOwners = [...new Set(farmlands.map((field: any) => field.properties.owner))];
            farmOwners.forEach((owner, index) => {
                farmsColors[owner] = generateColor(index);
            });
            farmsColors[0] = '#808080';

            let geoJSON = L.geoJSON(farmlands, {
                style: function (farmland: any) {
                    return { color: farmsColors[farmland.properties.owner] };
                }
            }).addTo(map);

            geoJSON.eachLayer(function (layer: any) {
                layer.bindTooltip(layer.feature.properties.popup);
                const center = layer.getBounds().getCenter();
                L.marker(center, {
                    icon: L.divIcon({
                        className: 'map-marker-field-id',
                        html: layer.feature.properties.id,
                        iconSize: [10, 10]
                    })
                }).addTo(map);
            });
        }
    });
</script>

<div class="flex two">
    <div class="sixth">
        <div class="filter-menu">
            <h2 class="text-center">Filter</h2>
            <a class="pseudo button full-width" href="#buttons">Buttons</a>
            <!-- Add more filter options here -->
        </div>
    </div>
    <div><div id="map"></div></div>
</div>
