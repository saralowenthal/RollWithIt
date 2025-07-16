import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  console.log("Event received:", event);

  let body;
  try {
    body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  } catch (err) {
    console.error("Invalid JSON body:", event.body);
    return {
      statusCode: 400,
      body: JSON.stringify("Invalid JSON"),
    };
  }  

  const { packingListId, title } = body;

  if (!packingListId || !title) {
    return {
      statusCode: 400,
      body: JSON.stringify("Missing required fields: packingListId and title"),
    };
  }

  const params = {
    TableName: "roll_with_it",
    Item: {
      pk: packingListId,
      title: title,
      items: [],
      created_at: new Date().toISOString(),
    },
  };

  console.log("DynamoDB PutCommand params:", params);

  try {
    await ddbDocClient.send(new PutCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify("Packing list created successfully"),
    };
  } catch (err) {
    console.error("Error writing to DynamoDB:", err);
    return {
      statusCode: 500,
      body: JSON.stringify("Error creating packing list in DynamoDB"),
    };
  }
};
