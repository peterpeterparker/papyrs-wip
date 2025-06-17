import { defineConfig } from '@junobuild/config';

export default defineConfig({
	satellite: {
		ids: {
			development: 'bkyz2-fmaaa-aaaaa-qaaaq-cai',
			production: 'zry52-liaaa-aaaal-artyq-cai'
		},
		source: 'build',
		predeploy: ['npm run build']
	}
});
