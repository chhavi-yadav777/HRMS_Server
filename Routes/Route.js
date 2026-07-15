let express = require("express")
let {SignUp, Login, CreateAccount} = require("../Controller/auth")


let router = express.Router()


router.post("/api/login", Login);
router.post("/api/SignUp", SignUp);
router.post("/api/signUp", SignUp);
router.post("/api/create-account", CreateAccount);


module.exports = router;

