<script lang="ts">
	// imports
	import { onMount } from 'svelte';
	// variables
	let serverData: any;
	// create map after mount
	onMount(async () => {
		let response = await fetch('/data/server.json');
		serverData = await response.json();
		console.log(serverData);
	});
</script>

<div class="row p-2">
	<!-- map data -->
	{#if serverData && serverData.map}
		<div class="col-12 mb-2 p-2 rounded">
			<div class="row">
				<div class="col-12">
					<div class="d-flex justify-content-center">
						<h2>Map</h2>
					</div>
				</div>
				{#if serverData.map.name}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Name:</strong><br />
								{serverData.map.name}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.map.size}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Size:</strong><br />
								{serverData.map.size}
								({serverData.map.width ? serverData.map.width : '?'} x
								{serverData.map.height ? serverData.map.height : '?'})
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	{/if}
	<!-- settings data -->
	{#if serverData && serverData.server}
		<div class="col-12 mb-2 p-2 rounded">
			<div class="row">
				<div class="col-12">
					<div class="d-flex justify-content-center">
						<h2>Settings</h2>
					</div>
				</div>
				{#if serverData.server.timeScale}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Current Timescale:</strong><br />
								{serverData.server.timeScale}x
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.timeScaleMultiplier}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Timescale Multiplier:</strong><br />
								{serverData.server.timeScaleMultiplier}x
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.plannedDaysPerPeriod}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Days per Period:</strong><br />
								{serverData.server.plannedDaysPerPeriod}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.initialMoney}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Initial Money:</strong><br />
								{new Intl.NumberFormat(navigator.language, {
									style: 'currency',
									currency: 'EUR'
								}).format(serverData.server.initialMoney)}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.initialLoan}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Initial Loan:</strong><br />
								{new Intl.NumberFormat(navigator.language, {
									style: 'currency',
									currency: 'EUR'
								}).format(serverData.server.initialLoan)}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.economicDifficulty}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Economic Difficulty:</strong><br />
								{serverData.server.economicDifficulty}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.dirtInterval}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Dirt Interval:</strong><br />
								{serverData.server.dirtInterval}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.stonesEnabled}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Stones enabled:</strong><br />
								{serverData.server.stonesEnabled}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.isSnowEnabled}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Snow enabled:</strong><br />
								{serverData.server.isSnowEnabled}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.weedsEnabled}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Weeds enabled:</strong><br />
								{serverData.server.weedsEnabled}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.stopAndGoBraking}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Stop & Go braking:</strong><br />
								{serverData.server.stopAndGoBraking}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.fruitDestruction}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Fruit destruction:</strong><br />
								{serverData.server.fruitDestruction}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.limeRequired}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Lime required:</strong><br />
								{serverData.server.limeRequired}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.trafficEnabled}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Traffic enabled:</strong><br />
								{serverData.server.trafficEnabled}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.startWithGuidedTour}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Guided Tour:</strong><br />
								{serverData.server.startWithGuidedTour}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.introductionHelpActive}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Introduction Help:</strong><br />
								{serverData.server.introductionHelpActive}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.automaticMotorStartEnabled}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Automatic Motor:</strong><br />
								{serverData.server.automaticMotorStartEnabled}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.trailerFillLimit}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Trailer Fill Limit:</strong><br />
								{serverData.server.trailerFillLimit}
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	{/if}
	<!-- helper data -->
	{#if serverData && serverData.server}
		<div class="col-12 mb-2 p-2 rounded">
			<div class="row">
				<div class="col-12">
					<div class="d-flex justify-content-center">
						<h2>Helper</h2>
					</div>
				</div>
				{#if serverData.server.helperBuyFuel}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Buy Fuel:</strong><br />
								{serverData.server.helperBuyFuel}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.helperBuySeeds}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Buy Seeds:</strong><br />
								{serverData.server.helperBuySeeds}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.helperBuyFertilizer}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Buy Fertilizer:</strong><br />
								{serverData.server.helperBuyFertilizer}
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	{/if}
	<!-- savegame data -->
	{#if serverData && serverData.server}
		<div class="col-12 mb-2 p-2 rounded">
			<div class="row">
				<div class="col-12">
					<div class="d-flex justify-content-center">
						<h2>Savegame</h2>
					</div>
				</div>
				{#if serverData.server.autoSaveInterval}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Autosave Interval:</strong><br />
								{serverData.server.autoSaveInterval} Minutes
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.creationDate}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Creation Date:</strong><br />
								{serverData.server.creationDate}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.saveDate}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Save Date:</strong><br />
								{serverData.server.saveDate}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.savegameName}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Savegame:</strong><br />
								{serverData.server.savegameName}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.savegameIndex}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Savegame Index:</strong><br />
								{serverData.server.savegameIndex}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.hasConflict}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Savegame Conflict:</strong><br />
								{serverData.server.hasConflict}
							</li>
						</ul>
					</div>
				{/if}
				{#if serverData.server.isCorruptFile}
					<div class="col-3 p-1 bg-body-tertiary rounded">
						<ul class="list-group">
							<li class="list-group-item">
								<strong>Savegame Corrupt:</strong><br />
								{serverData.server.isCorruptFile}
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
