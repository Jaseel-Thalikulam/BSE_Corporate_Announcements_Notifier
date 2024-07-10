import express from "express";
import cron from "node-cron";
import { secrets } from "./constants/constants.js";
import { cronFn } from "./controllers/fetchAnnouncements.js";
import "./services/telegram.services.js";
import { connectDB } from "./config/dbconfig.js";

const app = express();

function start() {
  connectDB()
    .then(() => {
      cron.schedule("*/30 * * * * *", cronFn);
      // cronFn()
      console.log("🕒 Cron job scheduled successfully.");
      app.listen(secrets.port, () => {
        console.log("✅ Everything is working fine.");
      });
    })
    .catch((err) => {
      console.error("❌ Failed to connect to the database:", err);
    });
}

start();
