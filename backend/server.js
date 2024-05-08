const http = require("http");
const port = process.env.PORT || 3000;
const app = require("./app");
const server = http.createServer(app); // the express app qualifies as a request handler
const MongoClient = require("mongodb").MongoClient;

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);

  console.log(`Server listening at http://localhost:${port}`);
});

const connectionString =
  "mongodb+srv://alvin06hk:Zenix@2023@database-z.p8xkqwp.mongodb.net/?retryWrites=true&w=majority&appName=database-z";
MongoClient.connect(connectionString)
  .then((client) => {
    console.log("Connected to database");
    const db = client.db("to-do-app");
    const taskCollection = db.collection("tasks");
    //CRUD request
  })
  .catch((error) => console.error(error));

server.listen(port);
