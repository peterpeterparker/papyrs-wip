<script lang="ts">
	import AdminMenuEditor from '$lib/components/toolbar/AdminMenuEditor.svelte';
	import AdminMenuUser from '$lib/components/toolbar/AdminMenuUser.svelte';
	import Cloud from '$lib/components/toolbar/Cloud.svelte';
	import Theme from '$lib/components/toolbar/Theme.svelte';
	import { userSignedIn, userNotSignedIn } from '$lib/derived/user.derived';
</script>

<nav class:end={$userNotSignedIn}>
	{#if $userSignedIn}
		<AdminMenuEditor />
	{/if}

	<div class:cloud={$userSignedIn}>
		{#if $userSignedIn}
			<Cloud />
		{/if}

		<AdminMenuUser />

		<Theme />
	</div>
</nav>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;

		pointer-events: none;

		&.end {
			justify-content: flex-end;
		}

		:global(*) {
			pointer-events: auto;
		}
	}

	div {
		display: grid;
		grid-template-columns: repeat(3, auto);

		@media (min-width: 768px) {
			grid-template-columns: repeat(2, auto);

			&.cloud {
				:global(aside) {
					grid-column: 2 / 3;
				}
			}
		}
	}
</style>
