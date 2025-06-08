<script lang="ts">
	import { signIn } from '$lib/services/auth.services';
	import { i18n } from '$lib/stores/i18n.store';

	const login = async () => {
		await signIn();
	};
</script>

<button onclick={login}>{$i18n.authentication.text.sign_in}</button>
