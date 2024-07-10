import telegramBot from "node-telegram-bot-api";
import { secrets } from "../constants/constants.js";
import { attachmentURLGenerator, messageGenerator } from "../lib/util.js";
import { subscribe } from "../controllers/subscribe.js";
import { getSubscribers } from "../controllers/getSubscribers.js";
import sanitizeHtml from "sanitize-html";

const bot = new telegramBot(secrets.telegramBotToken, { polling: true });

bot.onText(/\/start/, async function onStart(msg) {
  try {
    await subscribe(msg.from.id);
    console.log(`${msg.chat.first_name} Subscribed 📥`);
    bot.sendMessage(msg.from.id, `*Welcome ${msg.chat.first_name}!*`, {
      parse_mode: "Markdown",
    });
  } catch (err) {
    console.log(err);
  }
});

export const sendMessage = async (newAnnouncements) => {
  try {
    const subscribers = await getSubscribers();

    if (!subscribers || !subscribers.length || !newAnnouncements.length)
      return;

      await Promise.all(
        subscribers.map(async ({ chatId }) => {
          for (const announcement of newAnnouncements) {
            let message = messageGenerator(
              announcement.SLONGNAME,
              announcement.NEWSSUB,
              announcement.HEADLINE,
              announcement.DT_TM,
              announcement.NEWS_DT
            );
            message = sanitizeHtml(message, {
              allowedTags: [
                "b",
                "strong",
                "i",
                "em",
                "code",
                "pre",
                "s",
                "strike",
                "del",
                "u",
              ],
              allowedAttributes: { pre: ["language"] },
            });

            const options = announcement.ATTACHMENTNAME
              ? {
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
                  parse_mode: "HTML",
                }
              : { parse_mode: "HTML" };

            await bot.sendMessage(chatId, message, options);
          }
        })
      );

    console.log("📨 New Announcements sent");
  } catch (err) {
    console.log(err);
  }
};
