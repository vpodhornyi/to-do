const conf = require('../config/server');

const mongodb = require('mongodb');
const MongoClient = require("mongodb").MongoClient;

const insertOne = async (collectionName, data) => {
  try {
    let client = await MongoClient.connect(conf.database.url, { useNewUrlParser: true });

    // console.log('connected successfully! INSERT_ONE');

    const currentDb = client.db(conf.database.dbName);
    const worksCol = currentDb.collection(collectionName);
    const id = await worksCol.insertOne(data);

    await client.close();

    return id.insertedId;
  }
  catch (err) {
    return false;
  }
};

const findMany = async (dbName, collectionName) => {
  try {
    let client = await MongoClient.connect(conf.database.url, { useNewUrlParser: true });

    const currentDb = client.db(dbName);
    const usersCol = currentDb.collection(collectionName);
    const notes = await usersCol.find({}).toArray();

    await client.close();

    return notes;
  }
  catch (err) {
    return false;
  }
};

const findOne = async (id, dbName, collectionName) => {
  try {
    let client = await MongoClient.connect(conf.database.url, { useNewUrlParser: true });

    const currentDb = client.db(dbName);
    const usersCol = currentDb.collection(collectionName);
    const notes = await usersCol.findOne({ _id: new mongodb.ObjectID(id) });

    await client.close();

    return notes;
  }
  catch (err) {
    return false;
  }
};

const updateOne = async (id, dbName, collectionName, data) => {
  try {
    let client = await MongoClient.connect(conf.database.url, { useNewUrlParser: true });

    const currentDb = client.db(dbName);
    const usersCol = currentDb.collection(collectionName);

    const foo = await usersCol.updateOne({ _id: new mongodb.ObjectID(id) }, { $set: data });

    await client.close();

    return foo.result.ok;
  }
  catch (err) {
    return false;
  }
};

const deleteOne = async (id, dbName, collectionName) => {
  try {
    let client = await MongoClient.connect(conf.database.url, { useNewUrlParser: true });

    const currentDb = client.db(dbName);
    const usersCol = currentDb.collection(collectionName);

    await usersCol.deleteOne({ _id: new mongodb.ObjectID(id) });
    await client.close();
    return true;
  }
  catch (err) {
    return false;
  }
};

const dropCollection = async (dbName, collectionName) => {
  try {
    let client = await MongoClient.connect(conf.database.url, { useNewUrlParser: true });

    const currentDb = client.db(dbName);
    const usersCol = currentDb.collection(collectionName);

    let names = await currentDb.listCollections().toArray();
    names = names.map(item => item.name);

    if (~names.indexOf(collectionName))
      await usersCol.drop();
    await client.close();
    return true;
  }
  catch (err) {
    return false;
  }
};

module.exports = {
  findMany: findMany,
  findOne: findOne,
  insertOne: insertOne,
  updateOne: updateOne,
  deleteOne: deleteOne,
  dropCollection: dropCollection
};