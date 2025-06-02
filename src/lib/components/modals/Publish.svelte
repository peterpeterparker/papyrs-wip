<script lang="ts">
	import { fade } from 'svelte/transition';
	import PublishEdit from '$lib/components/publish/PublishEdit.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import { publish } from '$lib/services/publish.services';
	import { i18n } from '$lib/stores/i18n.store';
	import type { PublishData } from '$lib/types/publish';

	interface Props {
		onclose: () => void;
	}

	let { onclose }: Props = $props();

	let step = $state<'init' | 'in-progress' | 'success' | 'error'>('init');

	const onsubmit = async (data: PublishData) => {
		step = 'in-progress';

		const { result } = await publish(data);

		step = result === 'success' ? 'success' : 'error';
	};
</script>

<Modal {onclose}>
	{#snippet title()}
		{$i18n.publish_edit.text.publish}
	{/snippet}

	{#if step === 'success'}
		<p in:fade>Success</p>
	{:else if step === 'in-progress'}
		<p in:fade>In progress...</p>
	{:else}
		<div in:fade>
			<PublishEdit {onclose} {onsubmit} />
		</div>
	{/if}
</Modal>
