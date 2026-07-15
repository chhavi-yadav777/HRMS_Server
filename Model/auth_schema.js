let mongoose = require("mongoose");

let auth_schema = mongoose.Schema({
    name: {
        type : String,
        required: true,
    },
    email: {
        type : String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type : String,
        required: true,
    },
    role: {
        type : String,
        required: true,
        default: "employee",
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "emp_data",
    },
});

//model pre-defined fn of mongoose is simply used to create a collection

let auth_data = mongoose.model("auth_data",auth_schema);

module.exports = auth_data;
