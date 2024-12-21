const { MongoDriver } = require("@st.db/mongodb");
const { Database,JSONDriver } = require("st.db");
//const path = require("path");
//const databaseJSONPath = path.join(__dirname,'../database/database.json');
require("dotenv/config");
let db = new Database();
const databaseName = 'Coin-Bot';
const collectionName = 'Bots';

db = new Database({driver: new MongoDriver(process.env.MONGODB_URL,databaseName,collectionName)});

module.exports = db;