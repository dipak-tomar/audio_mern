import mongoose from "mongoose";
import { URI } from "@/utils/variables";

mongoose
  .connect(URI)
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log("db connection failed: ", err);
  });
