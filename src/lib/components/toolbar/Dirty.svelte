<script lang="ts">
	import { i18n } from '$lib/stores/i18n.store';
</script>

<div class="info">
	<p>{$i18n.sync.text.wait}</p>
</div>

<style lang="scss">
	@use '../../styles/mixins/overlay';

	.info {
		@include overlay.content;
	}

	p {
		margin: 0;
	}
</style>
