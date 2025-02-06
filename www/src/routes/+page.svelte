<script lang="ts">
	// imports
	import { onMount } from 'svelte';
	// variables
	let serverData: any;
	// create map after mount
	onMount(async () => {
		let response = await fetch('/data/server.json');
		serverData = await response.json();
	});
</script>

<div class="row p-2">
	<!-- map data -->
	{#if serverData && serverData.map}
		<div class="col-12 col-md-6 col-lg-3 mb-4">
			<div class="card h-100">
				<div class="card-header">Map</div>
				<div class="scrollable-list">
					<ul class="list-group list-group-flush">
						{#if serverData.map.name}
							<li class="list-group-item">
								<strong>Name:</strong><br />
								{serverData.map.name}
							</li>
						{/if}
						{#if serverData.map.size}
							<li class="list-group-item">
								<strong>Size:</strong><br />
								{serverData.map.size}
								({serverData.map.width ? serverData.map.width : '?'} x
								{serverData.map.height ? serverData.map.height : '?'})
							</li>
						{/if}
					</ul>
				</div>
			</div>
		</div>
	{/if}
	<!-- settings data -->
	{#if serverData && serverData.server}
		<div class="col-12 col-md-6 col-lg-3 mb-4">
			<div class="card h-100">
				<div class="card-header">Settings</div>
				<div class="scrollable-list">
					<ul class="list-group list-group-flush">
						{#if serverData.server.timeScale}
							<li class="list-group-item">
								<strong>Current Timescale:</strong><br />
								{serverData.server.timeScale}x
							</li>
						{/if}
						{#if serverData.server.timeScaleMultiplier}
							<li class="list-group-item">
								<strong>Timescale Multiplier:</strong><br />
								{serverData.server.timeScaleMultiplier}x
							</li>
						{/if}
						{#if serverData.server.plannedDaysPerPeriod}
							<li class="list-group-item">
								<strong>Days per Period:</strong><br />
								{serverData.server.plannedDaysPerPeriod}
							</li>
						{/if}
						{#if serverData.server.initialMoney}
							<li class="list-group-item">
								<strong>Initial Money:</strong><br />
								{new Intl.NumberFormat(navigator.language, {
									style: 'currency',
									currency: 'EUR'
								}).format(serverData.server.initialMoney)}
							</li>
						{/if}
						{#if serverData.server.initialLoan}
							<li class="list-group-item">
								<strong>Initial Loan:</strong><br />
								{new Intl.NumberFormat(navigator.language, {
									style: 'currency',
									currency: 'EUR'
								}).format(serverData.server.initialLoan)}
							</li>
						{/if}
						{#if serverData.server.economicDifficulty}
							<li class="list-group-item">
								<strong>Economic Difficulty:</strong><br />
								{serverData.server.economicDifficulty}
							</li>
						{/if}
						{#if serverData.server.dirtInterval}
							<li class="list-group-item">
								<strong>Dirt Interval:</strong><br />
								{serverData.server.dirtInterval}
							</li>
						{/if}
						{#if serverData.server.stonesEnabled}
							<li class="list-group-item">
								<strong>Stones enabled:</strong><br />
								{serverData.server.stonesEnabled}
							</li>
						{/if}
						{#if serverData.server.isSnowEnabled}
							<li class="list-group-item">
								<strong>Snow enabled:</strong><br />
								{serverData.server.isSnowEnabled}
							</li>
						{/if}
						{#if serverData.server.weedsEnabled}
							<li class="list-group-item">
								<strong>Weeds enabled:</strong><br />
								{serverData.server.weedsEnabled}
							</li>
						{/if}
						{#if serverData.server.stopAndGoBraking}
							<li class="list-group-item">
								<strong>Stop & Go braking:</strong><br />
								{serverData.server.stopAndGoBraking}
							</li>
						{/if}
						{#if serverData.server.fruitDestruction}
							<li class="list-group-item">
								<strong>Fruit destruction:</strong><br />
								{serverData.server.fruitDestruction}
							</li>
						{/if}
						{#if serverData.server.limeRequired}
							<li class="list-group-item">
								<strong>Lime required:</strong><br />
								{serverData.server.limeRequired}
							</li>
						{/if}
						{#if serverData.server.trafficEnabled}
							<li class="list-group-item">
								<strong>Traffic enabled:</strong><br />
								{serverData.server.trafficEnabled}
							</li>
						{/if}
						{#if serverData.server.startWithGuidedTour}
							<li class="list-group-item">
								<strong>Guided Tour:</strong><br />
								{serverData.server.startWithGuidedTour}
							</li>
						{/if}
						{#if serverData.server.introductionHelpActive}
							<li class="list-group-item">
								<strong>Introduction Help:</strong><br />
								{serverData.server.introductionHelpActive}
							</li>
						{/if}
						{#if serverData.server.automaticMotorStartEnabled}
							<li class="list-group-item">
								<strong>Automatic Motor:</strong><br />
								{serverData.server.automaticMotorStartEnabled}
							</li>
						{/if}
						{#if serverData.server.trailerFillLimit}
							<li class="list-group-item">
								<strong>Trailer Fill Limit:</strong><br />
								{serverData.server.trailerFillLimit}
							</li>
						{/if}
					</ul>
				</div>
			</div>
		</div>
	{/if}
	<!-- helper data -->
	{#if serverData && serverData.server}
		<div class="col-12 col-md-6 col-lg-3 mb-4">
			<div class="card h-100">
				<div class="card-header">Helper</div>
				<div class="scrollable-list">
					<ul class="list-group list-group-flush">
						{#if serverData.server.helperBuyFuel}
							<li class="list-group-item">
								<strong>Buy Fuel:</strong><br />
								{serverData.server.helperBuyFuel}
							</li>
						{/if}
						{#if serverData.server.helperBuySeeds}
							<li class="list-group-item">
								<strong>Buy Seeds:</strong><br />
								{serverData.server.helperBuySeeds}
							</li>
						{/if}
						{#if serverData.server.helperBuyFertilizer}
							<li class="list-group-item">
								<strong>Buy Fertilizer:</strong><br />
								{serverData.server.helperBuyFertilizer}
							</li>
						{/if}
					</ul>
				</div>
			</div>
		</div>
	{/if}
	<!-- savegame data -->
	{#if serverData && serverData.server}
		<div class="col-12 col-md-6 col-lg-3 mb-4">
			<div class="card h-100">
				<div class="card-header">Savegame</div>
				<div class="scrollable-list">
					<ul class="list-group list-group-flush">
						{#if serverData.server.autoSaveInterval}
							<li class="list-group-item">
								<strong>Autosave Interval:</strong><br />
								{serverData.server.autoSaveInterval} Minutes
							</li>
						{/if}
						{#if serverData.server.creationDate}
							<li class="list-group-item">
								<strong>Creation Date:</strong><br />
								{serverData.server.creationDate}
							</li>
						{/if}
						{#if serverData.server.saveDate}
							<li class="list-group-item">
								<strong>Save Date:</strong><br />
								{serverData.server.saveDate}
							</li>
						{/if}
						{#if serverData.server.savegameName}
							<li class="list-group-item">
								<strong>Savegame:</strong><br />
								{serverData.server.savegameName}
							</li>
						{/if}
						{#if serverData.server.savegameIndex}
							<li class="list-group-item">
								<strong>Savegame Index:</strong><br />
								{serverData.server.savegameIndex}
							</li>
						{/if}
						{#if serverData.server.hasConflict}
							<li class="list-group-item">
								<strong>Savegame Conflict:</strong><br />
								{serverData.server.hasConflict}
							</li>
						{/if}
						{#if serverData.server.isCorruptFile}
							<li class="list-group-item">
								<strong>Savegame Corrupt:</strong><br />
								{serverData.server.isCorruptFile}
							</li>
						{/if}
					</ul>
				</div>
			</div>
		</div>
	{/if}
</div>
