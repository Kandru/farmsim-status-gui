<script lang="ts">
	// imports
	import { onMount } from 'svelte';
	import FarmDetails from '$lib/components/farms/farmDetails.svelte';
	let farmsData: any;
	// create map after mount
	onMount(async () => {
		// get farms data
		let response = await fetch('/data/farms.json');
		const data = await response.json();
		farmsData = Object.values(data);
	});
</script>

<div class="row">
	<div class="col-12 ps-0 pe-0">
		<nav>
			<div class="nav nav-tabs" id="nav-tab" role="tablist">
				{#each farmsData as farm, index}
					<button
						class="nav-link {index === 0 ? 'active' : ''}"
						id="nav-{farm.id}-tab"
						data-bs-toggle="tab"
						data-bs-target="#nav-{index}"
						type="button"
						role="tab"
						aria-controls="nav-{index}"
						aria-selected={index === 0 ? 'true' : 'false'}>{farm.name}</button
					>
				{/each}
			</div>
		</nav>
	</div>
	<div class="col-12 bg-body-tertiary">
		<div class="tab-content" id="nav-tabContent">
			{#each farmsData as farm, index}
				<div
					class="tab-pane {index === 0 ? 'show' : ''} {index === 0 ? 'active' : ''}"
					id="nav-{index}"
					role="tabpanel"
					aria-labelledby={farm.name}
					tabindex={index}
				>
					<FarmDetails {farm} />
				</div>
			{/each}
		</div>
	</div>
</div>
