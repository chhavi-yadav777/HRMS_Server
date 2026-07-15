const auth_data = require("../Model/auth_schema");
let emp_data = require("../Model/emp_Schema");

let empSignUp = async(req, res) =>{
    let{name,username, email, phone, address, dob, doj, designation, department} = req.body;
    try{
        
        let data = await emp_data({
            name:name,
            username:username,
            email:email,
            phone:phone,
            address:address,
            dob:dob,
            doj:doj,
            dest:designation,
            dept:department
        }).save()
        return res.status(201).json({
            success:true, 
            message:"Registered Successfully",
            data:data
        });

    } catch (error){
        return res.status(500).json({
            success:false, 
            message : "Something went wrong",
            error:error,
        })

    }

}

let findData = async(req, res)=>{
    try{
        // let{username,body}=req.body;
        let data = await emp_data.find();
        if(!data){
        return res.status(404).json({success:false, message:"User Not Found"});
        }else{
            return res.status(200).json({success:true, data:data});
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({success:false, message:"something went wrong"})
    }
}

let updateEmpApi = async(req,res)=>{
    console.log(req.body);
    console.log(req.files.empImage[0].filename);

    let empImage = req.files.empImage[0].filename;
    if(req.files){
        console.log(req.body.empEmail);
        let update_emp_image = await emp_data.updateOne(
            {email: req.body.empEmail},
            {$set: {
                empImage: empImage,
            }}
        )
        return res.status(200).json({
            succes:"true",
            message: "Image Updated."
        })
    }


    // let{name,username, email, phone, address, dob, doj, dest, dept} = req.body;


    // try{

    //     let existingEmp = await emp_data.findOne({ email : email});

    //     if(!existingEmp){
    //         return res.status(404).json({success : false, message : "Record not found"})
    //     }else{
    //         let updateEmp = await emp_data.updateOne({email:email},{$set:{
            
    //         name:name,
    //         username:username,
    //         email:email,
    //         phone:phone,
    //         address:address,
    //         dob:dob,
    //         doj:doj,
    //         dest:dest,
    //         dept:dept
    //         }})
    //     }
    //     return res.status(200).json({success:true, message:"Record Updated Successfully."})

    // }catch(error){
    //     return res.status(500).json({success:false, message:"Something went wrong"});
    // }
}


let updateEmpId = async (req,res)=>{
    console.log(req.body);
    console.log(req.params);

    let {id} = req.params;
    let{name,username, email, phone, address, dob, doj, dest, dept} = req.body;

    try{
        let update_employee = await emp_data.findByIdAndUpdate(id,{

            name:name,
            username:username,
            email:email,
            phone:phone,
            address:address,
            dob:dob,
            doj:doj,
            dest:dest,
            dept:dept

        });

        if(!update_employee){
            return res
            .status(404)
            .json({success:false, message:"Record not found"});
        }else{
            return res.status(200).json({success:true, message:"Record update successfully."});
        }

    }catch(error){
        return res.status(500).json({success:false, message:"Something went wrong"});
    }

}

module.exports = {empSignUp,findData,updateEmpApi,updateEmpId};

