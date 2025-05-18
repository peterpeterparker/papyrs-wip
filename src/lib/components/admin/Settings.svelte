<script lang="ts">
	import Identifier from '$lib/components/ui/Identifier.svelte';
	import Value from '$lib/components/ui/Value.svelte';
	import { i18n } from '$lib/stores/i18n.store.js';
	import { userStore } from '$lib/stores/user.store';
</script>

<h1>{$i18n.nav.settings}</h1>

<div>
	<Value>
		{#snippet label()}
			{$i18n.settings.admin_id}
		{/snippet}
		<Identifier identifier={$userStore?.key ?? ''} />
	</Value>
</div>

<style lang="scss">
	div {
		margin: var(--padding-6x) 0;
	}
</style>
