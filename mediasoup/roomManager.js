export class RoomManager {
  constructor() {
    this.rooms = new Map(); // roomId -> { transports, producers, consumers }
  }

  initRoom(roomId) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        transports: new Map(),
        producers: new Map(),
        consumers: new Map(),
      });
    }
  }

  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  // Add methods: addTransport, addProducer, getTransport etc.
}