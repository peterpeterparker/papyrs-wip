<script lang="ts">
	import { signIn } from '@junobuild/core';

	const login = async () => {
		await signIn();
	};

	// TODO: i18n
</script>

<button onclick={login}>Continue with Internet Identity</button>