let auth_data = require("../Model/auth_schema");
let emp_data = require("../Model/emp_Schema");
let jwt =  require("jsonwebtoken");
let bcrypt = require("bcrypt")
let mongoose = require("mongoose");

let SECRET_KEY = "HRMS";

// // let SignUp = async(req,res ) =>{
//     console.log(req.body);

//     let {name,email,password,confirmPassword} = req.body;

//     try{

//         let existing_user = await auth_data.findOne({email:email});
//         if(existing_user){
//             return res
//             .status(409)
//             .json({success: false, message: "User already exist"});
//         }


//         let data = await auth_data({
//             name: name,
//             email:email,
//             password:password,
//             confirmPassword:confirmPassword,
//         }).save()
//         return res
//         .status(201)
//         .json({success:true, message:"Record created successfully"})

//     }catch(error){

//         res.json({success:false, message:"Something went wrong"});
 
//     }


// // }

let createUserAccount = async(req, res) =>{
    let {name, email, password, confirmPassword, role = "employee", employeeId} = req.body;
    try{
        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Name, email, password and confirm password are required"
            })
        }

        if(password != confirmPassword){
            return res.status(400).json({
                success:false, 
                message : "Password does not match"
            })
        }

        let existing_User = await auth_data.findOne({email : email});
        if(existing_User){
            return res.status(409).json({
                success:false, 
                message:"User already exists",
            })
        }

        let linkedEmployeeId;
        if(employeeId){
            if(!mongoose.Types.ObjectId.isValid(employeeId)){
                return res.status(400).json({
                    success:false,
                    message:"Invalid employee id"
                })
            }

            let employee = await emp_data.findById(employeeId);
            if(!employee){
                return res.status(404).json({
                    success:false,
                    message:"Employee not found"
                })
            }

            linkedEmployeeId = employee._id;
        }

        let hashPassword = await bcrypt.hash(password,10);

        let data = await auth_data({
            name:name,
            email:email,
            password:hashPassword,
            role:role,
            employeeId: linkedEmployeeId
        }).save()

        let token = jwt.sign({email:data.email, role:data.role},SECRET_KEY);
        return res.status(201).json({
            success:true, 
            message:"Registered Successfully", 
            token:token,
            data: {
                id: data._id,
                name: data.name,
                email: data.email,
                role: data.role,
                employeeId: data.employeeId
            }
        });

    } catch (error){

        return res.status(500).json({
            success:false, 
            message : "Something went wrong"
        })

    }

}

let SignUp = createUserAccount;

let CreateAccount = async(req, res) =>{
    return createUserAccount(req, res);
}


let Login = async(req,res)=>{

    let {email, password} = req.body;

    try{
        let existing_User = await auth_data.findOne({email:email})
        if(!existing_User){
            return res.status(404).json({
                scuccess:false, 
                message: "User not found"});
        }else{
            let matched = await bcrypt.compare(password, existing_User.password);
            if(!matched){
                return res.status(400).json({success:false, message:"Invalid Credentials"});
            }
            let token = jwt.sign({email:existing_User.email},SECRET_KEY);
            return res.status(200).json({success:true, message:"Login Successfully", token:token});

        }
    }catch(error){

    }

}


module.exports = {SignUp , Login, CreateAccount};
