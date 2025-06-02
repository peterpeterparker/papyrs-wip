/**
 * Auto-generated definitions file ("npm run i18n")
 */

interface I18nCore {
	close: string;
	loading: string;
	in_progress: string;
	yes: string;
	no: string;
	reset: string;
	ok: string;
	save: string;
	delete: string;
	sure: string;
	add: string;
	submit: string;
	cancel: string;
	got_it: string;
	back: string;
	copy: string;
	copied: string;
}

interface I18nNav {
	menu: string;
	sign_out: string;
	sign_in: string;
	ready_to_share: string;
	profile: string;
	settings: string;
	more: string;
}

interface I18nProfile {
	switch_theme: string;
}

interface I18nTools {
	new: string;
	open: string;
	user: string;
	profile_image: string;
}

interface I18nSync {
	cloud: string;
	cloud_error: string;
	cloud_in_progress: string;
	cloud_idle: string;
	cloud_pending: string;
	cloud_init: string;
	info: string;
	status: string;
	wait: string;
}

interface I18nEditor {
	text: { bold: string; upload_image: string };
	errors: {
		init: string;
		load: string;
		metadata_not_found: string;
		content_not_found: string;
		upload_image: string;
	};
}

interface I18nAuthentication {
	text: { session_expired: string };
	errors: { sign_in: string };
}

interface I18nSettings {
	admin_id: string;
}

interface I18nPublish_edit {
	text: {
		title_max_chars: string;
		description: string;
		title: string;
		publish: string;
		canonical_url: string;
		update_published: string;
		update_now: string;
		blog_post: string;
		slug: string;
	};
	errors: { get_editable: string; empty_post: string; publish_failed: string };
}

interface I18n {
	lang: Languages;
	core: I18nCore;
	nav: I18nNav;
	profile: I18nProfile;
	tools: I18nTools;
	sync: I18nSync;
	editor: I18nEditor;
	authentication: I18nAuthentication;
	settings: I18nSettings;
	publish_edit: I18nPublish_edit;
}
