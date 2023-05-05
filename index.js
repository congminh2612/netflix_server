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
import { google } from "googleapis";
import fs from "fs";
import path from "path";

dotenv.config();
const app = express();

const port = process.env.PORT_DEFAULT;

//TEST
const CLIENT_ID = process.env.GOOGLE_DRIVER_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_DRIVER_CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_GOOGLE_DRIVER;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const driver = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const setFilePublic = async (fileId) => {
  try {
    await driver.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const getUrl = await driver.files.get({
      fileId,
      fields: "webViewLink,webContentLink",
    });
    return getUrl;
  } catch (error) {
    console.error(error);
  }
};

const uploadFile = async () => {
  try {
    const createFile = await driver.files.create({
      requestBody: {
        name: "avatar.jpg",
        mimeType: "img/jpg",
      },
      media: {
        mineType: "img/jpg",
        body: fs.createReadStream("/home/cong-minh/Pictures/avatar.jpg"),
      },
    });
    const fileId = createFile.data.id;
    console.log(createFile.data);
    const getUrl = await setFilePublic(fileId);
    console.log(getUrl.data);
  } catch (error) {
    console.log(error);
  }
};
const deleteFile = async () => {
  try {
    const deleteFile = await driver.files.delete({
      fileId: "15naOkWQKSUnvcQMKf9r23MtvQZvf6iSe",
    });
    console.log(deleteFile.data, deleteFile.status);
  } catch (error) {}
};
// uploadFile();
// deleteFile();
//
clientRedis;
mongooseConnect();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/movie", movieRoute);
app.use("/api/list", listRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
