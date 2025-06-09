import {
	defineAssert,
	defineHook,
	type AssertFunction,
	type AssertSetDoc,
	type OnSetDoc,
	type OnSetDocContext,
	type AssertSetDocContext,
	type RunFunction
} from '@junobuild/functions';
import { createOrUpdatePost } from './publish';
import { assertPost } from './assert';

const collections = ['metadata'] as const;

type OnSetDocCollection = (typeof collections)[number];

export const assertSetDoc = defineAssert<AssertSetDoc>({
	collections,
	assert: (context) => {
		const fn: Record<OnSetDocCollection, AssertFunction<AssertSetDocContext>> = {
			metadata: assertPost
		};

		fn[context.data.collection as OnSetDocCollection]?.(context);
	}
});

export const onSetDoc = defineHook<OnSetDoc>({
	collections,
	run: async (context) => {
		const fn: Record<OnSetDocCollection, RunFunction<OnSetDocContext>> = {
			metadata: createOrUpdatePost
		};

		await fn[context.data.collection as OnSetDocCollection]?.(context);
	}
});
