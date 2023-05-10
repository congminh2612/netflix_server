import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import movieRoute from "./routes/movie.js";
import listRoute from "./routes/list.js";
import { mongooseConnect } from "./db/connectMongoDB.js";
import clientRedis from "./db/connectRedis.js";
import { uploadFile } from "./controllers/movies/uploadMovie.js";

dotenv.config();
const app = express();

const port = process.env.PORT_DEFAULT;

//TEST

clientRedis;
mongooseConnect();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/movie", movieRoute);
app.use("/api/list", listRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
