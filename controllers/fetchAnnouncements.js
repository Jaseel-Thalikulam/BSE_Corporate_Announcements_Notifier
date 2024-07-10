import { getCurrentDateInIndia } from "../lib/util.js";
import { sendMessage } from "../services/telegram.services.js";
import { getAnnouncements } from "../api/api.js";
let previousAnnouncements = [];
let todaysData = getCurrentDateInIndia();

export const cronFn = async () => {
  try {
    const fromDate = getCurrentDateInIndia();
    const response = await getAnnouncements(fromDate);
    const jsonData = response.data.Table;

    if (!jsonData || jsonData.length <= 0) return;

    const newAnnouncements = jsonData?.filter((announcement) => {
      const announcementDate = new Date(announcement.NEWS_DT);
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

      return (
        announcementDate > tenMinutesAgo &&
        !previousAnnouncements.some(
          (prevAnnouncement) => prevAnnouncement.NEWSID === announcement.NEWSID
        )
      );
    });

    if (newAnnouncements.length > 0) {
      if (previousAnnouncements.length > 0) {
        sendMessage(newAnnouncements);
      }

      previousAnnouncements = previousAnnouncements.filter(
        (prevAnnouncement) => {
          const announcementDate = new Date(prevAnnouncement.NEWS_DT);
          const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
          return announcementDate > tenMinutesAgo;
        }
      );

      previousAnnouncements = [...previousAnnouncements, ...newAnnouncements];
      if (todaysData !== fromDate) {
        todaysData = fromDate;
        previousAnnouncements = [];
      }
    } else {
      console.log("📭 No new announcements.");
    }
  } catch (err) {
    console.log(err);
  }
};
