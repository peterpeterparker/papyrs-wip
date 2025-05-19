<script lang="ts">
	import { notEmptyString } from '@dfinity/utils';
	import Editor from '$lib/components/ui/Editor.svelte';
	import { route } from '$lib/derived/route.derived.svelte.js';
	import { initUserPost } from '$lib/services/edit.services';
	import { setContent, setMetadata } from '$lib/services/idb.services';
	import { onImgToUpload } from '$lib/services/image.services';
	import { userStore } from '$lib/stores/user.store';
	import type { PostContent } from '$lib/types/juno';

	let content = $state<PostContent | undefined>(undefined);

	const onUpdate = async (content: PostContent) => {
		await setContent(content);

		// TODO: do we really really want this?
		const title = document.querySelector('article h1');
		const firstParagraph = document.querySelector('article h1 + p');

		await setMetadata({
			title:
				title?.nodeType === Node.ELEMENT_NODE && notEmptyString(title?.textContent)
					? title.textContent
					: undefined,
			description:
				firstParagraph?.nodeType === Node.ELEMENT_NODE &&
				notEmptyString(firstParagraph?.textContent)
					? firstParagraph.textContent
					: undefined
		});
	};

	const init = async () => {
		const { result, content: initContent } = await initUserPost({
			user: $userStore,
			routeKey: route.key
		});

		if (result === 'not_allowed') {
			return;
		}

		if (result === 'error') {
			// TODO: what to do in first login when user is not yet a controller READ+WRITE?
			return;
		}

		content = initContent ?? '';
	};

	$effect(() => {
		$userStore;
		route.key;

		init();
	});
</script>

<Editor {content} {onUpdate} {onImgToUpload} />
