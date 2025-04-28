import {defineConfig} from '@junobuild/config';

export default defineConfig({
  satellite: {
    ids: {
      development: 'bkyz2-fmaaa-aaaaa-qaaaq-cai',
      production: '<PROD_SATELLITE_ID>'
    },
    source: 'build',
    predeploy: ['npm run build']
  }
});
