import type { Editor } from '@tiptap/core';
import { getContext, setContext } from 'svelte';
import { type Readable, writable } from 'svelte/store';

interface EditorData {
	editor: Editor | undefined;
}

interface EditorContext {
	store: Readable<EditorData>;
	setEditor: (editor: Editor | undefined) => void;
}

const EDITOR_CONTEXT_KEY = Symbol('editor');

export const initEditorContext = (): EditorContext => {
	const {
		update,
		set: _,
		...rest
	} = writable<EditorData>({
		editor: undefined
	});

	const setEditor = (editor: Editor | undefined) => update((state) => ({ ...state, editor }));

	return setContext(EDITOR_CONTEXT_KEY, { store: { ...rest }, setEditor });
};

export const getEditorContext = (): EditorContext => getContext<EditorContext>(EDITOR_CONTEXT_KEY);
