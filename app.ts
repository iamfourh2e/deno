import {Application} from './deps.ts';

import router from './routers/router.ts';
const app = new Application({port: 3004})


app.use('/api/v1', router);
app.get('/', (ctx) => {
  return {
    message: "Hello world"
  }
})

await app.run();