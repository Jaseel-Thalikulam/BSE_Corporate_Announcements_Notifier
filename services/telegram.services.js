import telegramBot from "node-telegram-bot-api";
import { secrets } from "../constants.js";
import { attachmentURLGenerator, formatDate } from "../lib/util.js";

const bot = new telegramBot(secrets.telegramBotToken, { polling: true });

export let subscribers = [{ chatId: 6261487516 }];
// messages.
bot.on("message", async (msg) => {
  try {
    const chatId = msg.chat.id;
    const text = msg.text;
    console.log(msg, "msg");
    if (text) {
      const commandRegex = /^\/([^\s]+)/;
      const match = text.match(commandRegex);

      if (match && match[1] === "start") {
        subscribers.push({
          chatId: chatId,
        });
        bot.sendMessage(chatId, `Welcome! ${msg.chat.first_name}`);
      }
    }
  } catch (err) {
    console.error("Error handling message:", err);
  }
  // send a message to the chat acknowledging receipt of their message
});

export const sendMessage = async (newAnnouncements) => {
  try {
    if (subscribers.length < 0 || newAnnouncements.length < 0) return;

    subscribers.map(({ chatId }) => {   
      newAnnouncements.forEach((announcement) => {
        let message = `
*📢 New Announcement 📢*

*Company:* ${announcement.SLONGNAME}

*Title:* ${announcement.NEWSSUB}

*Date:* ${announcement.DT_TM}

*Description:* ${announcement.HEADLINE}

*Exchange Disseminated Time:* ${formatDate(announcement.DT_TM)}

*Exchange Received Time:* ${formatDate(announcement.NEWS_DT)}
        `.trim();

           message = message.replace(/([_*[\]()~`>#+=|{}.!-])/g, "\\$1");
          
        if (!announcement.ATTACHMENTNAME) {
          bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
          return;
        }

        const options = {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "View PDF",
                  url: attachmentURLGenerator(announcement),
                },
              ],
            ],
          },
          parse_mode: "Markdown",
        };

        bot.sendMessage(chatId, message, options);
      });
    });
  } catch (err) {
    console.log(err);
  }
};
