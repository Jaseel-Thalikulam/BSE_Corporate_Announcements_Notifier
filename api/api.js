import axios from "axios";

export const getAnnouncements = async (date) => {
  try {
    const currentPage = 1;
    const headers = {
      authority: "api.bseindia.com",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36",
      referer: "https://www.bseindia.com/",
      cookie: "",
    };
    return await axios.get(
      `https://api.bseindia.com/BseIndiaAPI/api/AnnSubCategoryGetData/w?pageno=${currentPage}&strCat=-1&strPrevDate=${date}&strScrip=&strSearch=P&strToDate=${date}&strType=C&subcategory=`,
      { headers }
    );
  } catch (err) {
    console.log(err);
  }
};
