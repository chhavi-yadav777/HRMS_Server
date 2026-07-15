let mongoose = require("mongoose");

let dotenv = require("dotenv");
dotenv.config();
let mongo_db = process.env.CONNECTION_STRING;

mongoose.connect(mongo_db).then(()=>{
    console.log("Database connected successfully")
}).catch((err)=>{
    console.log("Database not connected");
    console.log(err);
});

module.exports = mongoose;