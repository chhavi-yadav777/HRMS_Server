let express = require("express")
let empRoute = express.Router();

let PostEmpAPI = require("../Controller/empController")
let {empSignUp,findData,updateEmpApi,updateEmpId} = require("../Controller/emp_auth")
// let findData = require("../Controller/empController")


let EmployeeProfile = require("../Files/EmployeeImage");


empRoute.post("/api/post/employee", empSignUp)

empRoute.get("/api/get/employee",findData);

empRoute.put("/api/update/byemail",EmployeeProfile, updateEmpApi);

empRoute.put("/api/update/byid/:id",updateEmpId);

module.exports = empRoute;