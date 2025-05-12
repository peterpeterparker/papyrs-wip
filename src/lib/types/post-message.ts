import type { WizardBusyData } from '$lib/stores/wizard-busy.store';
import type { UserOption } from '$lib/types/user';
import type { Environment } from '@junobuild/core';

export type PostMessageDataRequest = {
	user: UserOption;
	container: string | null | undefined;
} & Pick<Environment, 'satelliteId'>;

export type PostMessageDataResponse = { workerId: keyof WizardBusyData };

export type PostMessageRequest = 'start' | 'stop';
export type PostMessageResponse = 'busy' | 'idle';

export interface PostMessage<T extends PostMessageDataRequest | PostMessageDataResponse> {
	msg: PostMessageRequest | PostMessageResponse;
	data?: T;
}
