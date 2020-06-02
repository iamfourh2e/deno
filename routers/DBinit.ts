import {MongoClient} from '../deps.ts';

const client = new MongoClient(); //create adapter for db
client.connectWithUri("mongodb://localhost:27017"); //connect to mongodb uri
const db = client.database('deno');

export default db;