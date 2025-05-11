<script lang="ts">
	import { authSubscribe } from '@junobuild/core';
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import Login from '$lib/components/auth/Login.svelte';
	import { userSignedIn } from '$lib/derived/user.derived';
	import { toastAndReload } from '$lib/services/auth.services';
	import { i18n } from '$lib/stores/i18n.store';
	import { userStore } from '$lib/stores/user.store';

	interface Props {
		welcome: Snippet;
		children: Snippet;
	}

	let { children, welcome }: Props = $props();

	let unsubscribe: (() => void) | undefined = undefined;

	onMount(() => (unsubscribe = authSubscribe((user) => userStore.set(user))));

	const automaticSignOut = () =>
		toastAndReload({
			text: $i18n.authentication.text.session_expired,
			level: 'warn'
		});

	onDestroy(() => unsubscribe?.());
</script>

<svelte:window onjunoSignOutAuthTimer={automaticSignOut} />

{#if $userSignedIn}
	<div in:fade>
		{@render children()}
	</div>
{:else}
	{@render welcome()}

	<Login />
{/if}
