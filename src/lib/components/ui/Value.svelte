<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		ref?: undefined | string;
		label: Snippet;
		children: Snippet;
	}

	let { ref = undefined, label, children }: Props = $props();
</script>

<div>
	<label for={ref}><strong>{@render label()}:</strong></label>
	{@render children()}
</div>

<style lang="scss">
	label {
		display: block;
	}
</style>
