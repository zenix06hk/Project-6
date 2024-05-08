const { MongoClient } = require("mongodb");

const main = async () => {
  const uri =
    "mongodb+srv://alvin06hk:Zenix@2023@database-z.p8xkqwp.mongodb.net/?retryWrites=true&w=majority&appName=database-z";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

main().catch(console.error);

const listDatabases = async (client) => {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
};
