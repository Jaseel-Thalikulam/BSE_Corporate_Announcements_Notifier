export const getCurrentDateInIndia = () => {
  const now = new Date();
    const offset = 5.5 * 60 * 60 * 1000;
  const indiaTime = new Date(now.getTime() + offset);
  return indiaTime.toISOString().split("T")[0];
};
