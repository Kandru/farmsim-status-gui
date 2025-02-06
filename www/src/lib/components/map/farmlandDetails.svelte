<script>
	let { farmsData, farmlandsData, farmlandId } = $props();
	let farmland = farmlandsData[farmlandId] || null;
	let farm = farmland && farmland.farmId ? farmsData[farmland.farmId] || null : null;
</script>

{#if farmland}
	<span class="fs-5 text-center">Farmland {farmlandId}</span>
	<hr />
	<div class="scrollable-list-map-details">
		<ul class="list-group list-group-flush">
			{#if farmland.isOwned && farm && farm.name}
				<li class="list-group-item rounded">
					<strong>Owner:</strong><br />
					{farm.name}
				</li>
			{/if}
			{#if farmland.areaInHa}
				<li class="list-group-item rounded">
					<strong>Hectar:</strong><br />
					{farmland.areaInHa}
				</li>
			{/if}
			{#if farmland.price}
				<li class="list-group-item">
					<strong>Price:</strong><br />
					{new Intl.NumberFormat(navigator.language, {
						style: 'currency',
						currency: 'EUR'
					}).format(farmland.price)}
				</li>
			{/if}
			{#if farmland.state}
				{#if farmland.state.fruitTypeIndex}
					<li class="list-group-item">
						<strong>Fruit Type:</strong><br />
						{farmland.state.fruitTypeIndex}
					</li>
				{/if}
				{#if farmland.state.groundType}
					<li class="list-group-item">
						<strong>Ground Type:</strong><br />
						{farmland.state.groundType}
					</li>
				{/if}
				{#if farmland.state.growthState}
					<li class="list-group-item">
						<strong>Growth State:</strong><br />
						{farmland.state.growthState}
					</li>
				{/if}
				{#if farmland.state.lastGrowthState}
					<li class="list-group-item">
						<strong>Last Growth Type:</strong><br />
						{farmland.state.lastGrowthState}
					</li>
				{/if}
				{#if farmland.state.limeLevel}
					<li class="list-group-item">
						<strong>Lime Level:</strong><br />
						{farmland.state.limeLevel}
					</li>
				{/if}
				{#if farmland.state.plowLevel}
					<li class="list-group-item">
						<strong>Plow Level:</strong><br />
						{farmland.state.plowLevel}
					</li>
				{/if}
				{#if farmland.state.rollerLevel}
					<li class="list-group-item">
						<strong>Roller Level:</strong><br />
						{farmland.state.rollerLevel}
					</li>
				{/if}
				{#if farmland.state.sprayLevel}
					<li class="list-group-item">
						<strong>Spray Level:</strong><br />
						{farmland.state.sprayLevel}
					</li>
				{/if}
				{#if farmland.state.sprayType}
					<li class="list-group-item">
						<strong>Spray Type:</strong><br />
						{farmland.state.sprayType}
					</li>
				{/if}
				{#if farmland.state.stoneLevel}
					<li class="list-group-item">
						<strong>Stone Level:</strong><br />
						{farmland.state.stoneLevel}
					</li>
				{/if}
				{#if farmland.state.stubbleShredLevel}
					<li class="list-group-item">
						<strong>Stubble Shred Level:</strong><br />
						{farmland.state.stubbleShredLevel}
					</li>
				{/if}
				{#if farmland.state.waterLevel}
					<li class="list-group-item">
						<strong>Water Level:</strong><br />
						{farmland.state.waterLevel}
					</li>
				{/if}
				{#if farmland.state.weedFactor}
					<li class="list-group-item">
						<strong>Weed Factor:</strong><br />
						{farmland.state.weedFactor}
					</li>
				{/if}
				{#if farmland.state.weedState}
					<li class="list-group-item">
						<strong>Weed State:</strong><br />
						{farmland.state.weedState}
					</li>
				{/if}
			{/if}
		</ul>
	</div>
{:else}
	<p>No farmlands data available.</p>
{/if}
