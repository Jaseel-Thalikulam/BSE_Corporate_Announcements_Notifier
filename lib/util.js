export const getCurrentDateInIndia = () => {
  const now = new Date();
  const offset = 5.5 * 60 * 60 * 1000;
  const indiaTime = new Date(now.getTime() + offset);
  return indiaTime.toISOString().split("T")[0];
};

export const attachmentURLGenerator = (announcement) => {
  return `https://www.bseindia.com/xml-data/corpfiling/AttachLive/${announcement.ATTACHMENTNAME}`;
};

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

export const messageGenerator = (companyName, title, description, EDT, ERT,category,subCategory) => {
  return `
<b>📢 New Announcement 📢</b>

<b>Company:</b> ${companyName}

<b>Title:</b> ${title}

<b>Category:</b> ${category}

<b>Sub-Category:</b> ${subCategory}

<b>Description:</b> ${description}

<b>Exchange Disseminated Time:</b> ${formatDate(EDT)}

<b>Exchange Received Time:</b> ${formatDate(ERT)}
      `.trim();
};


export const filterByUseCase = (newAnnouncements) => {
  try {
    return newAnnouncements.filter(
      (announcement) =>
        ["Company Update", "Board Meeting", "AGM/EGM", "Corp. Action"].includes(
          announcement.CATEGORYNAME
        ) &&
        [
          //Company Update
          "General",
          "Acquisition",
          "Agreement",
          "Allotment of Equity Shares",
          "Allotment of Warrants",
          "Award of Order / Receipt of Order",
          "Buy back",
          "Change in Registered Office",
          "Delisting",
          "Joint Venture",
          "Open Offer",
          "Press Release / Media Release",
          "Strike",
          "Utilisation of Funds",
          "Credit Rating",
          "Change of Name",
          "Analyst / Investor Meet",
          "Increase of Authorised Capital",
          "Monthly Business Updates",
          "Diversification / Disinvestment",
          "Offer for Sale",
          "Open Offer - Updates",
          "Preferential Issue",
          "Public Announcement-Open Offer",
          "Qualified Institutional Placement",
          "Raising of Funds",
          "Restructuring",
          "Change in Registered Office Address",
          "Earnings Call Transcript",
          "Public Announcement",
          "Approval of Resolution plan by Tribunal",
          "Amalgamation/ Merger",
          "De-merger",
          "Sale or disposal",
          "Corporate Insolvency Resolution Process",

          //Board Meeting
          "Outcome of Board Meeting",

          //AGM/EGM
          "EGM",
          //Corp.Acton
          "Amalgamation / Merger / Demerger",
          "Bonus",
          "Book Closure",
          "Capital Reduction",
          "Dividend",
          "Sub-division / Stock Split",
          "Bonds / Right issue",
        ].includes(announcement.SUBCATNAME)
    );
  } catch (err) {
    console.log(err);
  }
};