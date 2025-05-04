import { Server } from 'mediasoup';
import { createWorker } from 'mediasoup';
import { RoomManager } from './roomManager.js';

export let worker;
export let router;
export const roomManager = new RoomManager();

export async function setupMediasoup() {
  worker = await createWorker();
  console.log('[Mediasoup] Worker created');
  router = await worker.createRouter({ mediaCodecs: [/* your codecs */] });
  console.log('[Mediasoup] Router created');
}

export function getRouter() {
  return router;
}
