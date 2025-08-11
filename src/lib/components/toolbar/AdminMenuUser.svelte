<script lang="ts">
	import { goto } from '$app/navigation';
	import IconMore from '$lib/components/icons/IconMore.svelte';
	import IconSettings from '$lib/components/icons/IconSettings.svelte';
	import IconSignIn from '$lib/components/icons/IconSignIn.svelte';
	import IconSignOut from '$lib/components/icons/IconSignOut.svelte';
	import IconUser from '$lib/components/icons/IconUser.svelte';
	import Dirty from '$lib/components/toolbar/Dirty.svelte';
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Popover from '$lib/components/ui/Popover.svelte';
	import { syncBusy } from '$lib/derived/sync.derived';
	import { userSignedIn } from '$lib/derived/user.derived';
	import { signIn, signOut as logout } from '$lib/services/auth.services';
	import { i18n } from '$lib/stores/i18n.store';

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

<Popover anchor={button} direction="rtl" bind:visible>
	{#if $syncBusy}
		<Dirty />
	{:else}
		{#if $userSignedIn}
			<button
				class="menu"
				aria-haspopup="menu"
				onclick={async () => await goto('/admin/profile')}
				role="menuitem"
				type="button"
			>
				<IconUser />
				<span>{$i18n.nav.profile}</span>
			</button>

			<button
				class="menu"
				aria-haspopup="menu"
				onclick={async () => await goto('/admin/settings')}
				role="menuitem"
				type="button"
			>
				<IconSettings />
				<span>{$i18n.nav.settings}</span>
			</button>
		{/if}

		{#if $userSignedIn}
			<button class="menu" aria-haspopup="menu" onclick={signOut} role="menuitem" type="button">
				<IconSignOut />
				<span>{$i18n.nav.sign_out}</span>
			</button>
		{:else}
			<button class="menu" aria-haspopup="menu" onclick={signIn} role="menuitem" type="button">
				<IconSignIn />
				<span>{$i18n.nav.sign_in}</span>
			</button>
		{/if}
	{/if}
</Popover>
