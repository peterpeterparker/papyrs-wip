<script lang="ts">
	import { nonNullish } from '@dfinity/utils';
	import { fade } from 'svelte/transition';
	import Version from './Version.svelte';
	import IconClose from '$lib/components/icons/IconClose.svelte';
	import Log from '$lib/components/notifications/Log.svelte';
	import Spinner from '$lib/components/ui/Spinner.svelte';
	import { busy } from '$lib/stores/busy.store';
	import { i18n } from '$lib/stores/i18n.store';

	let visible = $derived(nonNullish($busy));

	const close = () => busy.stop();
</script>

{#if visible}
	<div transition:fade>
		{#if $busy?.close === true}
			<div class="backdrop" on:click={close} />
		{/if}

		<div class="content">
			{#if $busy?.close === true}
				<button class="text close" aria-label={$i18n.core.close} on:click|stopPropagation={close}
					><IconClose /></button
				>
			{/if}

			{#if $busy?.log === true}
				<Log />
			{/if}

			{#if $busy?.log === true && $busy?.spinner === false}
				<Version />
			{/if}

			{#if $busy?.spinner === true}
				<div class="spinner">
					<Spinner />
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	@use '../../styles/mixins/interaction';
	@use '../../styles/mixins/overlay';

	div {
		z-index: calc(var(--z-index) + 1000);

		position: fixed;
		inset: 0;

		@include overlay.backdrop('dark');
	}

	.backdrop {
		position: absolute;
		inset: 0;

		background: transparent;

		@include interaction.tappable;
	}

	.content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		width: fit-content;

		background: transparent;
	}

	.spinner {
		position: relative;
		height: 30px;
		margin: 1.45rem;
		--spinner-color: white;
	}

	.close {
		align-self: flex-end;
	}

	.text {
		color: white;
	}
</style>
