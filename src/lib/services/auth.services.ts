import { signOut } from '@junobuild/core';

export const logout = async ({ clearLocalEdit }: { clearLocalEdit: boolean }) => {
	if (clearLocalEdit) {
		// TODO: await clearEdit(true);
	}

	// reset log history
	// TODO: logs.set([]);

	await signOut();
};
