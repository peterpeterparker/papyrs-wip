<script lang="ts">
	import { goto } from '$app/navigation';
	import IconMore from '$lib/components/icons/IconMore.svelte';
	import IconSignIn from '$lib/components/icons/IconSignIn.svelte';
	import IconSignOut from '$lib/components/icons/IconSignOut.svelte';
	import IconUser from '$lib/components/icons/IconUser.svelte';
	import Dirty from '$lib/components/toolbar/Dirty.svelte';
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Popover from '$lib/components/ui/Popover.svelte';
	import { userSignedIn } from '$lib/derived/user.derived';
	import { signIn, signOut as logout } from '$lib/services/auth.services';
	import { i18n } from '$lib/stores/i18n.store';
	import { sync } from '$lib/stores/sync.store';

	let visible = $state<boolean | undefined>(undefined);
	let button = $state<HTMLButtonElement | undefined>(undefined);

	const signOut = async () => {
		await logout();

		visible = false;
	};
</script>

<Button onclick={() => (visible = true)} bind:button>
	{#snippet icon()}
		{#if $userSignedIn}
			<Avatar />
		{:else}
			<IconMore />
		{/if}
	{/snippet}

	{$userSignedIn ? $i18n.tools.user : $i18n.nav.more}
</Button>

<Popover bind:visible anchor={button} direction="rtl">
	{#if $sync.dirty}
		<Dirty />
	{:else}
		{#if $userSignedIn}
			<button
				type="button"
				role="menuitem"
				aria-haspopup="menu"
				onclick={async () => await goto('/profile')}
				class="menu"
			>
				<IconUser />
				<span>{$i18n.nav.profile}</span>
			</button>
		{/if}

		{#if $userSignedIn}
			<button type="button" role="menuitem" aria-haspopup="menu" onclick={signOut} class="menu">
				<IconSignOut />
				<span>{$i18n.nav.sign_out}</span>
			</button>
		{:else}
			<button type="button" role="menuitem" aria-haspopup="menu" onclick={signIn} class="menu">
				<IconSignIn />
				<span>{$i18n.nav.sign_in}</span>
			</button>
		{/if}
	{/if}
</Popover>
