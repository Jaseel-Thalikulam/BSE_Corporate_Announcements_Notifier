import express from 'express'
import cron from 'node-cron'
import { secrets } from './constants.js'
import { fetchAnnouncements } from './controllers/fetchAnnouncements.js'



const app = express()

// cron.schedule("*/30 * * * * *", fetchAnnouncements);
fetchAnnouncements()

app.listen(secrets.port,() => {
    console.log("Listening to :)",secrets.port)
})


