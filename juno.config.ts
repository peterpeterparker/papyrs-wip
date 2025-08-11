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
		collections
	},
	emulator: {
		runner: {
			type: "docker"
		},
		satellite: {}
	}
});
