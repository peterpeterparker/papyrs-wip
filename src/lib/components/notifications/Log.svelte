<script lang="ts">
	import { logs } from '$lib/stores/logs.store';
	import { round } from '$lib/utils/number.utils';

	let div = $state<HTMLDivElement | undefined>(undefined);

	$effect(() => {
		div?.scrollTo(0, div?.scrollHeight);
	});
</script>

<div bind:this={div}>
	{#each $logs as { msg, duration, level }, i (i)}
		<span class={level}>$ {msg} {duration ? `${round(duration / 1000)}s` : ''}</span>
	{/each}
</div>

<style lang="scss">
	@use '../../styles/mixins/text';
	@use '../../styles/mixins/shadow';

	div {
		display: flex;
		flex-direction: column;

		width: min(700px, calc(100vw - 4.45rem));
		min-height: min(250px, calc(100vh - 200px));

		font-family: monospace;
		font-size: var(--font-size-very-small);

		@include shadow.shadow;

		background: #222222;
		color: white;

		padding: 0.45rem;
		max-height: 50px;
		height: 50px;

		overflow-y: scroll;

		&::-webkit-scrollbar-thumb {
			background-color: black;
		}
	}

	.error {
		color: var(--color-error);
	}
</style>
