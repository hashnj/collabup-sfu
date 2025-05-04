import mediasoup from 'mediasoup';
import { roomManager } from './roomManager.js';

let worker;
let router;

export async function setupMediasoup() {
  worker = await mediasoup.createWorker();
  router = await worker.createRouter({ mediaCodecs: [
    {
      kind: 'audio',
      mimeType: 'audio/opus',
      clockRate: 48000,
      channels: 2
    },
    {
      kind: 'video',
      mimeType: 'video/VP8',
      clockRate: 90000,
      parameters: {}
    }
  ]});
  roomManager.setRouter(router);
  console.log('Mediasoup worker and router initialized');
}

export { router };
