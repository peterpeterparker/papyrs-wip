<script lang="ts">
	import IconUser from '$lib/components/icons/IconUser.svelte';

	interface Props {
		photoUrl?: string;
		alt?: string;
	}

	let { photoUrl, alt }: Props = $props();
</script>

{#if photoUrl}
	<img loading="lazy" src={photoUrl} {alt} />
{:else}
	<IconUser />
{/if}

<style lang="scss">
	img {
		width: 24px;
		min-height: 24px;
		border: 1px solid black;
	}
</style>
