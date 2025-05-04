import { getRouter, roomManager } from './mediasoup/mediasoupServer.js';

export function registerRoutes(app) {
  app.post('/getRtpCapabilities', (req, res) => {
    const router = getRouter();
    res.json(router.rtpCapabilities);
  });

  app.post('/createTransport', async (req, res) => {
    const { roomId } = req.body;
    const router = getRouter();
    const transport = await router.createWebRtcTransport({
      listenIps: [{ ip: '0.0.0.0', announcedIp: null }],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
    });

    roomManager.initRoom(roomId);
    roomManager.getRoom(roomId).transports.set(transport.id, transport);

    res.json({
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    });
  });

  app.post('/connectTransport', async (req, res) => {
    const { transportId, dtlsParameters, roomId } = req.body;
    const transport = roomManager.getRoom(roomId).transports.get(transportId);
    await transport.connect({ dtlsParameters });
    res.json({ connected: true });
  });

  app.post('/produce', async (req, res) => {
    const { roomId, transportId, kind, rtpParameters } = req.body;
    const transport = roomManager.getRoom(roomId).transports.get(transportId);
    const producer = await transport.produce({ kind, rtpParameters });
    roomManager.getRoom(roomId).producers.set(producer.id, producer);
    res.json({ id: producer.id });
  });

  app.post('/consume', async (req, res) => {
    const { roomId, transportId, rtpCapabilities } = req.body;
    const router = getRouter();
    if (!router.canConsume({ producerId: [...roomManager.getRoom(roomId).producers.keys()][0], rtpCapabilities })) {
      return res.status(400).json({ error: 'Cannot consume' });
    }

    const producer = [...roomManager.getRoom(roomId).producers.values()][0];
    const transport = roomManager.getRoom(roomId).transports.get(transportId);
    const consumer = await transport.consume({
      producerId: producer.id,
      rtpCapabilities,
      paused: false,
    });

    roomManager.getRoom(roomId).consumers.set(consumer.id, consumer);

    res.json({
      id: consumer.id,
      producerId: producer.id,
      kind: consumer.kind,
      rtpParameters: consumer.rtpParameters,
    });
  });
}
