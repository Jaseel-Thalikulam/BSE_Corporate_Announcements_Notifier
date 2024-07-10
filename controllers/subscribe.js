import Chat from "../models/chat.model.js";

export const subscribe = async (chatId) => {
  try {
    const isSubscribed = await Chat.findOne({ chatId: chatId });
    if (isSubscribed) return;

    const newSubscription = new Chat({ chatId: chatId });
      newSubscription.save();

      return
  } catch (err) {
    console.log(err);
  }
};
