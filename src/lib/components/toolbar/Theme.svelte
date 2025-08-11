<script lang="ts">
	import { i18n } from '$lib/stores/i18n.store';
	import { theme } from '$lib/stores/theme.store';
	import { Theme } from '$lib/types/theme';
	import { i18nFormat } from '$lib/utils/i18n.utils';

	const themes: Theme[] = Object.values(Theme);
</script>

<aside>
	{#each themes as listTheme (listTheme)}
		<button
			class={listTheme}
			class:selected={listTheme === $theme}
			aria-label={`${i18nFormat($i18n.profile.switch_theme, [
				{ placeholder: '{0}', value: listTheme }
			])}`}
			onclick={() => theme.select(listTheme)}
			type="button"
		></button>
	{/each}
</aside>

<style lang="scss">
	aside {
		display: flex;
		align-items: center;

		flex-wrap: wrap;
		width: 6.15rem;

		margin: 0.45rem 1rem;
		padding: 0 0.15rem;

		grid-row: 1;
		grid-column: 1 / 2;

		@media (min-width: 768px) {
			flex-direction: column-reverse;
			align-items: flex-end;

			grid-row: 2;

			width: auto;

			margin: 0;
			padding: 0.45rem 0.15rem;
		}
	}

	button {
		padding: 0.4rem;
		margin: 0.35rem 0.45rem;

		background: var(--theme-switcher-buttom-background, #ffeed6);
		color: var(--theme-switcher-buttom-color, #000000);

		@media (min-width: 768px) {
			margin: 0.25rem 0;
		}

		&.selected {
			box-shadow: 1px 1px black;
			transform: translateX(2px) translateY(2px);
		}

		&:hover:not(:disabled),
		&:focus:not(:disabled) {
			background: var(--theme-switcher-buttom-background-hover, #ffcf98);
		}

		&.aero-blue {
			--theme-switcher-buttom-background: #d5ffef;
			--theme-switcher-buttom-color: #000000;

			&:hover:not(:disabled),
			&:focus:not(:disabled) {
				--theme-switcher-buttom-background-hover: #97ffd2;
			}
		}

		&.lavender-blue {
			--theme-switcher-buttom-background: #c4cdff;
			--theme-switcher-buttom-color: #000000;

			&:hover:not(:disabled),
			&:focus:not(:disabled) {
				--theme-switcher-buttom-background-hover: #7888ff;
			}
		}

		&.pink-lace {
			--theme-switcher-buttom-background: #ffd5f7;
			--theme-switcher-buttom-color: #000000;

			&:hover:not(:disabled),
			&:focus:not(:disabled) {
				--theme-switcher-buttom-background-hover: #ff97e7;
			}
		}

		&.baby-pink {
			--theme-switcher-buttom-background: #ffcece;
			--theme-switcher-buttom-color: #000000;

			&:hover:not(:disabled),
			&:focus:not(:disabled) {
				--theme-switcher-buttom-background-hover: #ff8989;
			}
		}
	}
</style>
