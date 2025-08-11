import { defineConfig, type Collections } from '@junobuild/config';

const collections: Collections = {
	datastore: [
		{
			collection: 'metadata',
			read: 'managed',
			write: 'managed',
			memory: 'stable'
		},
		{
			collection: 'content',
			read: 'managed',
			write: 'managed',
			memory: 'stable'
		}
	],
	storage: [
		{
			collection: 'images',
			read: 'managed',
			write: 'managed',
			memory: 'stable'
		},
		{
			collection: 'content',
			read: 'managed',
			write: 'managed',
			memory: 'stable'
		}
	]
};

export default defineConfig({
	satellite: {
		ids: {
			development: 'jx5yt-yyaaa-aaaal-abzbq-cai',
			production: '<PROD_SATELLITE_ID>'
		},
		source: 'build',
		predeploy: ['npm run build'],
		collections,
		// TODO: The configuration failed with 1 error 😢.
		// 0: Wrong number of return values
		// authentication: {
		// 	rules: {
		// 		allowedCallers: ["gzzzh-k6mjj-yzbo5-voxpo-hpys7-5ucs3-4eqf2-cgmtu-dbqiu-u3vwe-lae"]
		// 	}
		// }
	},
	emulator: {
		runner: {
			type: "docker"
		},
		satellite: {}
	}
});
