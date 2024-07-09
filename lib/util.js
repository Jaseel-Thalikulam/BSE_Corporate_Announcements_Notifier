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
