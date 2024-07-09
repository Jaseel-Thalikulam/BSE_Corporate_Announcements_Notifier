import dotenv from 'dotenv'
dotenv.config()

export const secrets = {
  port: process.env.PORT,
  gmail: process.env.GMAIL,
  nodemailerAppPassword: process.env.NODEMAILER_APP_PASSWORD,
};