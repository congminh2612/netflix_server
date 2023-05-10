import { google } from "googleapis";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
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

const uploadFile = async (req, res) => {
  const fileData = req.body;
  try {
    const createFile = await driver.files.create({
      requestBody: {
        name: fileData.name,
        mimeType: fileData.type,
      },
      media: {
        mineType: fileData.type,
        body: fs.createReadStream(fileData.path),
      },
    });
    const fileId = createFile.data.id;

    const getUrl = await setFilePublic(fileId);
    console.log(getUrl.data);
    return res.status(200).json({ data: createFile.data, url: getUrl.data });
  } catch (error) {
    console.log(error);
    return res.status(500).json("error");
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

export { uploadFile, deleteFile };
