/*
Objective: Verify actions from the Users or API which took place (in When.js) -> Side Effects!
 */
const AWS = require("aws-sdk");
require("dotenv").config();

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

module.exports = {
  user_exists_in_UsersTable,
};
