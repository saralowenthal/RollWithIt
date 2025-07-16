const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  console.info("Event received:", event);

  const listId = event?.queryStringParameters?.listId;

  if (!listId) {
    return {
      statusCode: 400,
      body: JSON.stringify("Missing 'listId' in query string"),
    };
  }

  let currentList;
  try {
    currentList = await getPackingListItems(listId);
    if (!Array.isArray(currentList)) {
      return {
        statusCode: 404,
        body: JSON.stringify("List not found or missing items array"),
      };
    }
  } catch (err) {
    return err;
  }

  let requestBody;
  try {
    requestBody = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify("Invalid JSON body"),
    };
  }

  if (!requestBody.newItem) {
    return {
      statusCode: 400,
      body: JSON.stringify("Missing 'newItem' in request body"),
    };
  }

  // Add new item to the list
  currentList.push(requestBody.newItem);

  const params = {
    TableName: "roll_with_it",
    Key: { pk: listId },
    UpdateExpression: "set #items = :value",
    ExpressionAttributeNames: {
      "#items": "items"
    },
    ExpressionAttributeValues: {
      ":value": currentList
    },
    ReturnValues: "UPDATED_NEW"
  };
  

  try {
    const data = await ddbDocClient.send(new UpdateCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify(data.Attributes),
    };
  } catch (err) {
    console.error("Error updating item in DynamoDB", err);
    return {
      statusCode: 500,
      body: JSON.stringify("Error updating item in DynamoDB"),
    };
  }
};

async function getPackingListItems(pk) {
  const params = {
    TableName: "roll_with_it",
    Key: { pk },
  };

  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    console.info("DynamoDB get data:", data);

    if (!data.Item || !Array.isArray(data.Item.items)) {
      throw {
        statusCode: 404,
        body: JSON.stringify("Item not found or items attribute missing"),
      };
    }
    return data.Item.items;
  } catch (err) {
    console.error("Error retrieving item from DynamoDB", err);
    throw {
      statusCode: 500,
      body: JSON.stringify("Error retrieving item from DynamoDB"),
    };
  }
}
