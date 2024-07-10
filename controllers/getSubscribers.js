import Chat from "../models/chat.model.js";

export const getSubscribers = async () => {
  try {
    return await Chat.find()
  } catch (err) {
    console.log(err);
  }
};
