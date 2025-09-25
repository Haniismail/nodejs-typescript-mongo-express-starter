import { port } from './config/envVar';
import app from './app';

app
  .listen(port, () => {
    console.log(`server running on port : ${port} ✅`);
  })
  .on('error', (e) => {
    console.log(e);
  });
