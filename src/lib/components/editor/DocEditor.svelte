<script lang="ts">
	import { isNullish, notEmptyString } from '@dfinity/utils';
	import Editor from '$lib/components/ui/Editor.svelte';
	import { initEditorContext } from '$lib/context/editor.context.js';
	import { route } from '$lib/derived/route.derived.svelte.js';
	import { initUserPost } from '$lib/services/edit.services';
	import { setContent, setMetadata } from '$lib/services/idb.services';
	import { onImgToUpload } from '$lib/services/image.services';
	import { userStore } from '$lib/stores/user.store';
	import type { PostContent } from '$lib/types/juno';

	const { store } = initEditorContext();

	let content = $state<PostContent | undefined>(undefined);

	const updateMetadata = async () => {
		const article = $store.editor?.options.element;

		if (isNullish(article)) {
			return;
		}

		// The article contains a div that is the contenteditable container.
		const contentEditable = article.firstElementChild;

		const title = contentEditable?.querySelector('*:nth-child(1)');
		const firstParagraph = contentEditable?.querySelector('*:nth-child(2)');

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

	const onUpdate = async (content: PostContent) => {
		await Promise.allSettled([setContent(content), updateMetadata()]);
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
