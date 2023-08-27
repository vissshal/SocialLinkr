import cors from "cors";
import mongoose from "mongoose";
const { connect } = mongoose;
import express, { json, urlencoded } from "express";
import router from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(json({ limit: "30mb", extended: true }));
app.use(urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", router);
app.use("/user", userRoutes);
app.use("/", (req, res) => {
  res.send("Hello to memoery API");
});
const PORT = process.env.PORT || 5000;
connect(process.env.REACT_APP_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
