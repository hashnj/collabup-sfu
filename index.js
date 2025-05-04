import express from "express";
import cors from "cors";
import { setupMediasoup, getRouter } from "./mediasoup/mediasoupServer.js";
import { registerRoutes } from "./routes/routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

registerRoutes(app);

app.get("/", (req, res) => res.send("Mediasoup Backend Running!"));

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await setupMediasoup();
});
