<script lang="ts">
	import Editor from '$lib/components/ui/Editor.svelte';
	import { routeKey } from '$lib/derived/nav.derived';
	import { initUserPost } from '$lib/services/edit.services';
	import { setContent } from '$lib/services/idb.services';
	import { userStore } from '$lib/stores/user.store';
	import type { PostContent } from '$lib/types/juno';

	let content = $state<PostContent>('# Hello World');

	const onUpdate = async (content: PostContent) => await setContent(content);

	const init = async () => {
		const { result: _ } = await initUserPost({ user: $userStore, routeKey: $routeKey });

		// TODO: to be continued
	};

	$effect(() => {
		$userStore;
		$routeKey;

		init();
	});
</script>

<Editor {content} {onUpdate} />
