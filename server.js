const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

MongoClient.connect(
  "mongodb+srv://madhu:madhu123@cluster0.j9apyly.mongodb.net/trips?retryWrites=true&w=majority"
)
  .then((dbClient) => {
    console.log("connected to db")
    const db = dbClient.db("trips");
    require("./routes")(app, db);
  })
  .catch((err) => {
    console.log("error connecting to mongoDb", err);
  });

app.listen(4000, () => {
  console.log("server running in port 4000");
});
