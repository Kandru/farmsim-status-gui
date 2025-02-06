<script lang="ts">
	// imports
	import { onMount } from 'svelte';
	import FarmlandDetails from '$lib/components/map/farmlandDetails.svelte';
	import 'leaflet/dist/leaflet.css';
	// variables
	let map: any;
	let mapLayerControl: any;
	let serverData: any;
	let farmsData: any;
	let farmlandsData: any;
	let selectedDetailsType: string | null = null;
	let selectedDetailsId: number | null = null;
	// generate colors for fields
	function generateColor(index: number) {
		const hue = (index * 137.508) % 360; // Use golden angle approximation
		return `hsl(${hue}, 100%, 50%)`;
	}
	// show details for farmlands
	function farmlandsOnclick(fieldId: number) {
		selectedDetailsType = 'farmland';
		selectedDetailsId = fieldId;
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
		if (serverData.map && serverData.map.name && serverData.map.size) {
			let minMapX,
				minMapY,
				maxMapX,
				maxMapY = 0;
			if (serverData.map.width && serverData.map.height) {
				minMapX = -serverData.map.width;
				minMapY = -serverData.map.height;
				maxMapX = serverData.map.width;
				maxMapY = serverData.map.height;
			} else {
				minMapX = -(serverData.map.size / 2);
				minMapY = -(serverData.map.size / 2);
				maxMapX = serverData.map.size / 2;
				maxMapY = serverData.map.size / 2;
			}
			map = L.map('map', {
				crs: L.CRS.Simple,
				minZoom: -2,
				maxBounds: [
					[minMapX, minMapY],
					[maxMapX, maxMapY]
				]
			}).setView([0, 0], -2);

			let mapImage = L.imageOverlay(
				'/images/maps/' + serverData.map.name.replace(/ /g, '_') + '.jpg',
				[
					[minMapX, minMapY],
					[maxMapX, maxMapY]
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
			// create farmlands layer
			let overlayFarmlands = L.geoJSON(farmlands, {
				style: function (farmland: any) {
					return { color: farmsColors[farmland.properties.owner] };
				},
				onEachFeature: function (feature: any, layer: any) {
					// what to do on click
					layer.on('click', function (event: any) {
						// reset highlight for all layers
						overlayFarmlands.eachLayer(function (layer: any) {
							overlayFarmlands.resetStyle(layer);
						});
						// highlight layer
						layer.setStyle({
							weight: 5,
							color: '#fff',
							dashArray: '',
							fillOpacity: 0.4
						});
						farmlandsOnclick(event.target.feature.properties.id);
					});
				}
			}).addTo(map);
			// add map marker id to farmlands
			overlayFarmlands.eachLayer(function (layer: any) {
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
	<div class="col-12 col-lg-9 ps-0 pe-0">
		<div id="map" class="bg-body-tertiary w-100 h-100"></div>
	</div>
	<div class="col-12 col-lg-3 bg-body-tertiary">
		<div class="d-flex flex-column flex-shrink-0 p-2 bg-body-tertiary text-bg-dark">
			<span class="fs-3 text-center">Details</span>
			<hr />
			{#key selectedDetailsId}
				{#if selectedDetailsType == 'farmland'}
					<FarmlandDetails {farmsData} {farmlandsData} farmlandId={selectedDetailsId} />
				{/if}
			{/key}
		</div>
	</div>
</div>
