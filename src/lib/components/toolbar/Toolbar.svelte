<script lang="ts">
	import Cloud from '$lib/components/toolbar/Cloud.svelte';
	import Menu from '$lib/components/toolbar/Menu.svelte';
	import Theme from '$lib/components/toolbar/Theme.svelte';
	import User from '$lib/components/toolbar/User.svelte';
	import { userSignedIn } from '$lib/derived/user.derived';
</script>

<nav>
	<Menu />

	<div class:cloud={$userSignedIn}>
		{#if $userSignedIn}
			<Cloud />
		{/if}

		<User />

		<Theme />
	</div>
</nav>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;

		pointer-events: none;

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
