import { createWorker } from 'mediasoup';

let worker;
let router;

export async function setupMediasoup() {
  worker = await createWorker({
    rtcMinPort: parseInt(process.env.MEDIASOUP_MIN_PORT || '2000'),
    rtcMaxPort: parseInt(process.env.MEDIASOUP_MAX_PORT || '2020')
  });

  console.log(`Worker PID ${worker.pid}`);

  router = await worker.createRouter({
    mediaCodecs: [
      {
        kind: 'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2
      },
      {
        kind: 'video',
        mimeType: 'video/VP8',
        clockRate: 90000
      }
    ]
  });

  console.log('Router created');

  worker.on('died', () => {
    console.error('Mediasoup worker died');
    process.exit(1);
  });
}
