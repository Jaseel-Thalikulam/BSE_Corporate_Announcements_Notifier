import dotenv from 'dotenv'
dotenv.config()

export const secrets = {
  port: process.env.PORT,
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  mongooseUrl: process.env.MONGOOSE_URL,
};