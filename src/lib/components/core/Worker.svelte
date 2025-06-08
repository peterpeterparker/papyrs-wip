<script lang="ts">
	import { isNullish } from '@dfinity/utils';
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { CONTAINER, SATELLITE_ID } from '$lib/constants/app.constants';
	import { userNotSignedIn } from '$lib/derived/user.derived';
	import { type ProposalWorker, initWorker } from '$lib/services/worker.services';
	import { i18n } from '$lib/stores/i18n.store';
	import { toasts } from '$lib/stores/toasts.store';
	import { userStore } from '$lib/stores/user.store';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let worker = $state<ProposalWorker | undefined>(undefined);

	onMount(async () => (worker = await initWorker()));

	$effect(() => {
		worker?.stop();

		if (isNullish(SATELLITE_ID)) {
			toasts.error({
				msg: { text: $i18n.sync.errors.init }
			});
			return;
		}

		if ($userNotSignedIn) {
			return;
		}

		worker?.start({
			user: $userStore,
			satelliteId: SATELLITE_ID,
			container: CONTAINER
		});
	});

	onDestroy(() => worker?.stop());
</script>

{@render children()}
