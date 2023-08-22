import { MongoClient } from "mongodb";

const url = process.env.DB_CONN_STRING as string;
const options: any = { useNewUrlParser: true };
let connectDB: Promise<MongoClient>;
declare global {
  namespace globalThis {
    var _mongo: Promise<MongoClient>;
  }
}
if (process.env.NODE_ENV === "development") {
  if (!globalThis._mongo) {
    globalThis._mongo = new MongoClient(url, options).connect();
  }
  connectDB = globalThis._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
