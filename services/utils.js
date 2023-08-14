import axios from 'axios';

export async function sendTelegramMessage(message) {
    try {
        const telegramUrl = `${process.env.TELEGRAM_URL}${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${message}`;
        await axios.get(telegramUrl);
    } catch (err) {
        console.log(err);
    }
}

export async function getTicketsStatus() {
    try {
        const res = await axios.get(process.env.TICKETS_URL);
        const html = res.data;
        const location = html.search('Israel - Tel Aviv');
        const nextLocation = html.search('North Macedonia - Skopje');
        const nextLocationChecked = nextLocation === -1 ? undefined : nextLocation;
        const htmlAfterLocationAndBeforeNextLocation = html.substring(location, nextLocationChecked);
        const ticketsButtonIsInactive = htmlAfterLocationAndBeforeNextLocation.search('btn btn-info btn-inactive');
        return ticketsButtonIsInactive === -1;
    } catch (err) {
        console.log(err);
    }
}