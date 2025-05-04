import express from 'express';
import { setupMediasoup } from './mediasoup/mediasoupServer.js';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('Mediasoup Backend Running!'));

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await setupMediasoup();
});
