<script lang="ts">
	// imports
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	// variables
	let map: any;
	let mapLayerControl: any;
	let serverData: any;
	let farmsData: any;
	let farmlandsData: any;
	// generate colors for fields
	function generateColor(index: number) {
		const hue = (index * 137.508) % 360; // Use golden angle approximation
		return `hsl(${hue}, 100%, 50%)`;
	}
	// filter fields
	let filterFieldsActive = true;
	function filterFields() {
		if (map) {
			filterFieldsActive = !filterFieldsActive;
			// Example: Change the map view to a different location
			map.setView([100, 100], 0);
		}
	}
	// create map after mount
	onMount(async () => {
		const L = await import('leaflet');
		let farmsColors: { [key: number]: string } = {};
		// get server data
		let response = await fetch('/data/server.json');
		serverData = await response.json();
		// get farms data
		response = await fetch('/data/farms.json');
		farmsData = await response.json();
		// get farmland data
		response = await fetch('/data/farmlands.json');
		farmlandsData = await response.json();

		if (
			serverData.map &&
			serverData.map.name &&
			serverData.map.size &&
			serverData.map.width &&
			serverData.map.height
		) {
			map = L.map('map', {
				crs: L.CRS.Simple,
				minZoom: -2,
				maxBounds: [
					[-(serverData.map.size / 2), -(serverData.map.size / 2)],
					[serverData.map.size / 2, serverData.map.size / 2]
				]
			}).setView([0, 0], -2);

			let mapImage = L.imageOverlay(
				'/images/maps/' + serverData.map.name.replace(/ /g, '_') + '.jpg',
				[
					[-(serverData.map.size / 2), -(serverData.map.size / 2)],
					[serverData.map.size / 2, serverData.map.size / 2]
				]
			).addTo(map);

			let farmlands: GeoJSON.Feature[] = Object.values(farmlandsData)
				.filter((entry: any) => entry.polygons !== null && entry.polygons !== undefined)
				.map((entry: any) => ({
					type: 'Feature',
					properties: {
						id: entry.id,
						owner: entry.farmId,
						popup: 'Field ' + entry.id + (entry.farmId > 0 ? ` (${entry.farmId})` : '')
					},
					geometry: {
						type: 'Polygon',
						coordinates: [
							Object.values(entry.polygons).map((coord: any) => [
								parseFloat(coord.x),
								-parseFloat(coord.y)
							])
						]
					}
				}));

			let farmOwners = [...new Set(farmlands.map((field: any) => field.properties.owner))];
			farmOwners.forEach((owner, index) => {
				farmsColors[owner] = generateColor(index);
			});
			farmsColors[0] = '#808080';

			let overlayFarmlands = L.geoJSON(farmlands, {
				style: function (farmland: any) {
					return { color: farmsColors[farmland.properties.owner] };
				}
			}).addTo(map);

			overlayFarmlands.eachLayer(function (layer: any) {
				layer.bindTooltip(layer.feature.properties.popup);
				const center = layer.getBounds().getCenter();
				L.marker(center, {
					icon: L.divIcon({
						className: 'map-marker-field-id',
						html: layer.feature.properties.id,
						iconSize: [10, 10]
					})
				}).addTo(overlayFarmlands);
			});
			// create layer control
			mapLayerControl = L.control
				.layers(
					{
						'Map Image': mapImage
					},
					{ Farmlands: overlayFarmlands },
					{
						hideSingleBase: true,
						collapsed: false
					}
				)
				.addTo(map);
		}
	});
</script>

<div class="row vhc-100">
	<div class="col-9 ps-0 pe-0 border-end">
		<div id="map" class="bg-body-tertiary w-100 h-100"></div>
	</div>
	<div class="col-3 bg-body-tertiary">
		<div class="d-flex flex-column flex-shrink-0 p-2 bg-body-tertiary text-bg-dark">
			<span class="fs-3">Details</span>
			<hr />
		</div>
	</div>
</div>
