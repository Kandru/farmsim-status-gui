<script>
	let { farm } = $props();
	import FarmStatistics from '$lib/components/farms/farmStatistics.svelte';
</script>

{#if farm}
	<div class="col-12 ps-0 pe-0">
		<nav>
			<div class="nav nav-tabs" id="nav-tab" role="tablist">
				{#if farm && farm.statistics}
					<button
						class="nav-link active"
						id="nav-{farm.id}-tab"
						data-bs-toggle="tab"
						data-bs-target="#nav-{farm.farmId}-statistics"
						type="button"
						role="tab"
						aria-controls="nav-{farm.farmId}-statistics"
						aria-selected="true">Statistics</button
					>
				{/if}
			</div>
		</nav>
	</div>
	<div class="col-12 bg-body-tertiary">
		<div class="tab-content" id="nav-tabContent">
			{#if farm && farm.statistics}
				<div
					class="tab-pane show active"
					id="nav-{farm.farmId}-statistics"
					role="tabpanel"
					aria-labelledby="Statistics"
					tabindex="0"
				>
					<FarmStatistics {farm} />
				</div>
			{/if}
		</div>
	</div>
{:else}
	<p>No farm data available.</p>
{/if}
