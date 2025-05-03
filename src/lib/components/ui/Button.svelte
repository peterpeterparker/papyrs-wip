<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		button?: HTMLButtonElement;
		disabled?: boolean;
		hidden?: boolean;
		onclick: () => void;
		icon: Snippet;
		children: Snippet;
	}

	let {
		button = $bindable(),
		disabled = false,
		hidden = false,
		onclick,
		icon,
		children
	}: Props = $props();
</script>

<button type="button" {onclick} bind:this={button} class="toolbar" {disabled} class:hidden>
	{@render icon()}
	<span class="visually-hidden">{@render children()}</span>
</button>

<style lang="scss">
	.hidden {
		display: none;
	}
</style>
