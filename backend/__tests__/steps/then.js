/*
Objective: Verify actions from the Users or API which took place (in When.js) -> Side Effects!
 */
const AWS = require("aws-sdk");
require("dotenv").config();
const http = require("axios");
const fs = require("fs");
const _ = require("lodash");

const user_exists_in_UsersTable = async (id) => {
  const DynamoDB = new AWS.DynamoDB.DocumentClient();
  console.log(
    `Looking for user ${id} in UsersTable [${process.env.USERS_TABLE}]`
  );
  const resp = await DynamoDB.get({
    TableName: process.env.USERS_TABLE,
    Key: { id },
  }).promise();
  // Data is on Item Oj
  return resp.Item;
};

const user_can_upload_image_to_url = async (url, filepath, contentType) => {
  const data = fs.readFileSync(filepath);
  await http({
    method: "put",
    url,
    headers: {
      "Content-Type": contentType,
    },
    data,
  });

  console.log("uploaded image to", url);
};

const user_can_download_image_from = async (url) => {
  const resp = await http(url);

  console.log("downloaded image from", url);

  return resp.data;
};

module.exports = {
  user_exists_in_UsersTable,
  user_can_upload_image_to_url,
  user_can_download_image_from,
};
