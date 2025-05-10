<script lang="ts">
	import { signIn } from '$lib/services/auth.services';

	const login = async () => {
		await signIn();
	};

	// TODO: i18n
</script>

<button onclick={login}>Continue with Internet Identity</button>
