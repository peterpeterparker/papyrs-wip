<script lang="ts">
	import Modal from '$lib/components/ui/Modal.svelte';
	import { i18n } from '$lib/stores/i18n.store';

	interface Props {
		onclose: () => void;
	}

	let { onclose }: Props = $props();
</script>

<Modal {onclose}>
	{#snippet title()}
		{$i18n.publish_edit.text.publish}
	{/snippet}

	TODO
</Modal>
