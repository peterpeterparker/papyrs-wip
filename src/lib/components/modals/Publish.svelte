<script lang="ts">
	import Modal from '$lib/components/ui/Modal.svelte';
	import { i18n } from '$lib/stores/i18n.store';
	import { fade } from 'svelte/transition';
	import PublishEdit from '$lib/components/publish/PublishEdit.svelte';

	interface Props {
		onclose: () => void;
	}

	let { onclose }: Props = $props();

	let step = $state<"init" | "in-progress" | "success" | "error">("init");

	const onsubmit = async ($event: SubmitEvent) => {
		$event.preventDefault();

		// TODO: publication
	}
</script>

<Modal {onclose}>
	{#snippet title()}
		{$i18n.publish_edit.text.publish}
	{/snippet}

	{#if step === "success"}
		<p in:fade>Success</p>
		{:else if step === "in-progress"}
		<p in:fade>In progress...</p>
		{:else}
		<div in:fade>
			<PublishEdit {onclose} {onsubmit} />
		</div>
		{/if}
</Modal>
