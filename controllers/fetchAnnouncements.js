import axios from "axios";
import { getCurrentDateInIndia } from "../lib/util.js";
import { sendMessage, subscribers } from "../services/telegram.services.js";
let previousAnnouncements = [];
let todaysData = getCurrentDateInIndia();

export const fetchAnnouncements = async () => {
  try {
    const fromDate = getCurrentDateInIndia();
    const toDate = fromDate;
    const currentPage = 1;
    const headers = {
      authority: "api.bseindia.com",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36",
      referer: "https://www.bseindia.com/",
      cookie: "",
    };

    const response = await axios.get(
      `https://api.bseindia.com/BseIndiaAPI/api/AnnSubCategoryGetData/w?pageno=${currentPage}&strCat=-1&strPrevDate=${fromDate}&strScrip=&strSearch=P&strToDate=${toDate}&strType=C&subcategory=`,
      { headers }
    );
    const jsonData = response.data.Table;
    if (jsonData.length <= 0) return;
    const newAnnouncements = jsonData.filter(
      (announcement) =>
        !previousAnnouncements.some(
          (prevAnnouncement) => prevAnnouncement.NEWSID === announcement.NEWSID
        )
    );

    if (newAnnouncements.length > 0) {
      console.log(newAnnouncements.length,'length')
      subscribers.map(({ email }) => {
        sendMessage(newAnnouncements, email);
      });

      previousAnnouncements = [...previousAnnouncements, ...newAnnouncements];
      if (todaysData !== fromDate) {
        todaysData = fromDate;
        previousAnnouncements = [];
      }
    } else {
      console.log("No new announcements.");
    }
  } catch (err) {
    console.log(err);
  }
};
