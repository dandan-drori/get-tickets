import { getTicketsStatus, sendTelegramMessage } from "./utils.js";

export async function startTicketsCheck() {
    const endDate = new Date('08-28-2023, 18:00').getTime();
    const intervalId = setInterval(async () => {
        try {
            const isTicketsAvailableForPurchase = await getTicketsStatus();
            if (!isTicketsAvailableForPurchase) {
                const message = 'TEST';
                // const message = `Your tickets are ready for purchase!\nGo to ${process.env.TICKETS_URL}`;
                await sendTelegramMessage(message);
                clearInterval(intervalId);
            }
            if (Date.now() >= endDate) {
                clearInterval(intervalId);
            }
        } catch (err) {
            console.log(err);
        }
    }, 1000 * 60 * 30);
};