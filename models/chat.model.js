import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chatId: {
      required: true,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema, "Chats");

export default Chat;
