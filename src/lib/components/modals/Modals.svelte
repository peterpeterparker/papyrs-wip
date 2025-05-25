<script lang="ts">
	import Publish from '$lib/components/modals/Publish.svelte';
	import { modalPublish } from '$lib/derived/modal.derived';
	import { modalStore } from '$lib/stores/modal.store';
</script>

{#if $modalPublish}
	<Publish onclose={modalStore.close} />
{/if}
