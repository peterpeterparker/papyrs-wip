export const titleToSlug = (title: string | undefined): string =>
	encodeURIComponent((title ?? '').replaceAll(' ', '-')).toLowerCase();
