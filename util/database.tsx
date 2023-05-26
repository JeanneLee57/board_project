import { MongoClient } from "mongodb";

const url = process.env.DB_CONN_STRING as string;
const options: any = { useNewUrlParser: true };
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };

// // External Dependencies
// import * as mongoDB from "mongodb";
// import * as dotenv from "dotenv";

// // Global Variables
// export const collections: { post?: mongoDB.Collection } = {};

// // Initialize Connection
// const database = process.env.DB_NAME as string;
// const collection = process.env.FORUM_COLLECTION_NAME as string;

// export async function connectToDatabase() {
//   dotenv.config();
//   const client: mongoDB.MongoClient = new mongoDB.MongoClient(url);
//   await client.connect();
//   const db: mongoDB.Db = client.db(database);
//   const postCollection: mongoDB.Collection = db.collection(collection);
//   collections.post = postCollection;
//   console.log(
//     `Successfully connected to database: ${db.databaseName} and collection: ${postCollection.collectionName}`
//   );
// }
