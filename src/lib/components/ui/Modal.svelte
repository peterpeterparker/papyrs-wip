<script lang="ts">
	import type { Snippet } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import IconClose from '$lib/components/icons/IconClose.svelte';
	import { i18n } from '$lib/stores/i18n.store';
	import { handleKeyPress } from '$lib/utils/keyboard.utils';

	interface Props {
		onclose: () => void;
		children: Snippet;
		title: Snippet;
	}

	let { onclose, children, title }: Props = $props();

	let visible = $state(true);

	const handleClose = ($event: UIEvent) => {
		$event.stopPropagation();
		close();
	};

	const close = () => {
		visible = false;
		onclose();
	};
</script>

{#if visible}
	<div
		class="modal"
		transition:fade
		role="dialog"
		aria-labelledby="modalTitle"
		aria-describedby="modalContent"
	>
		<div
			tabindex="-1"
			role="button"
			class="backdrop"
			onclick={handleClose}
			onkeypress={($event) => handleKeyPress({ $event, callback: close })}
			aria-label={$i18n.core.close}
		></div>
		<div transition:scale={{ delay: 25, duration: 150, easing: quintOut }} class="wrapper">
			<div class="toolbar">
				<h3 id="modalTitle">{@render title()}</h3>
				<button onclick={handleClose} aria-label={$i18n.core.close}><IconClose /></button>
			</div>

			<div class="content" id="modalContent">
				{@render children()}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@use '../../styles/mixins/interaction';
	@use '../../styles/mixins/section';
	@use '../../styles/mixins/overlay';
	@use '../../styles/mixins/shadow';

	.modal {
		position: fixed;
		inset: 0;

		z-index: calc(var(--z-index) + 998);
	}

	.backdrop {
		position: absolute;
		inset: 0;

		@include overlay.backdrop('dark');

		@include interaction.tappable;
	}

	.wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		@include section.large;
		height: calc(min(100vh, 796px) - 2.75rem);

		@supports (-webkit-touch-callout: none) {
			max-height: -webkit-fill-available;
		}

		@include shadow.strong;

		overflow: hidden;
	}

	.toolbar {
		display: grid;
		grid-template-columns: 65px 1fr 65px;
		align-items: center;

		h3 {
			grid-column-start: 2;
			text-align: center;
			margin-bottom: 0;
		}

		button {
			grid-column-start: 3;
			margin: 0.45rem;
		}
	}

	.content {
		position: relative;

		padding: var(--modal-content-padding, 0 2.45rem);

		overflow: auto;
		height: calc(100% - 60px);
		max-height: calc(100% - 60px);

		:global(section) {
			max-width: 100%;
		}
	}
</style>
