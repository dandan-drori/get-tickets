import 'dotenv/config';
import axios from 'axios';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, welcome to get-tickets!\nWe will notify you via Telegram when the tickets you requested are available for purchase!');
});

app.listen(3030, () => {
  console.log('Server is running on port 3030');
});

(async () => {
  const maxRunsCount = 7200;
  let counter = 0;
  const intervalId = setInterval(async () => {
    try {
      const isTicketsAvailableForPurchase = await getTicketsStatus();
      if (isTicketsAvailableForPurchase) {
        await sendTelegramMessage();
        clearInterval(intervalId);
      }
      counter++;
      if (counter >= maxRunsCount) {
        clearInterval(intervalId);
      }
    } catch (err) {
      console.log(err);
    }
  }, 1000 * 60 * 15);
})();

async function sendTelegramMessage() {
  const telegramUrl = `${process.env.TELEGRAM_URL}${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&text=`;
  const message = `Your tickets are ready for purchase!\nGo to ${process.env.TICKETS_URL}`;
  try {
    await axios.get(telegramUrl + message);
  } catch (err) {
    console.log(err);
  }
}

async function getTicketsStatus() {
  try {
    const res = await axios.get(process.env.TICKETS_URL);
    const html = res.data;
    return !html.search('btn btn-info btn-inactive');
  } catch (err) {
    console.log(err);
  }
}