import 'dotenv/config';
import express from 'express';
import { startTicketsCheck } from "./services/tickets.js";

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, welcome to get-tickets!\nWe will notify you via Telegram when the tickets you requested are available for purchase!');
});

app.listen(3030, () => {
  console.log('Server is running on port 3030');
});

(async () => {
  await startTicketsCheck();
})();
