  import mongoose from "mongoose";
  import { secrets } from "../constants/constants.js";

  export const connectDB = () => {
   return mongoose
      .connect(secrets.mongooseUrl)
      .then(() => console.log("🔗 Mongoose Connected"));
  };
