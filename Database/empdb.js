let mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/HRMS").then(()=>{
    console.log("Database connected successfully")
}).catch(()=>{
    console.log("Database not connected");
});

module.exports = mongoose;