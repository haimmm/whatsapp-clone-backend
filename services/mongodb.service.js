const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);
let db = null;

const connect = async (db_name) => {
  await client.connect();
  db = client.db(db_name);
};

const close = async () => await client.close();

const add = async (coll_name, record) => {
  const collection = db.collection(coll_name);
  const result = await collection.insertOne(record);
  return result.insertedId.toString();
};

const find = async (coll_name, queries = [{}]) => {
  const collection = db.collection(coll_name);
  let results = [];
  if (!Array.isArray(queries)) queries = [queries];
  for await (const q of queries) {
    if (typeof q._id === "string") q._id = new ObjectId(q._id);
    const response = await collection.find(q).toArray();
    results = results.concat(response);
  }
  return results;
};

const update = async (coll_name, filters = {}, changes) => {
  const collection = db.collection(coll_name);
  return await collection.updateOne(filters, changes);
};

const remove = async (coll_name, filters = {}) => {
  const collection = db.collection(coll_name);
  return await collection.deleteMany(filters);
};

module.exports = {
  add,
  find,
  update,
  remove,
  connect,
  close,
};
