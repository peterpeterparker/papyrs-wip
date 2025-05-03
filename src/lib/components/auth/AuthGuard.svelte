<script lang="ts">
	import { authSubscribe } from '@junobuild/core';
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import Login from '$lib/components/auth/Login.svelte';
	import { userSignedIn } from '$lib/derived/user.derived';
	import { userStore } from '$lib/stores/user.store';

	interface Props {
		welcome: Snippet;
		children: Snippet;
	}

	let { children, welcome }: Props = $props();

	let unsubscribe: (() => void) | undefined = undefined;

	onMount(() => (unsubscribe = authSubscribe((user) => userStore.set(user))));

	// TODO: implement a toast to display when signed-out automatically
	const automaticSignOut = () => console.log('Automatically signed out because session expired');

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
