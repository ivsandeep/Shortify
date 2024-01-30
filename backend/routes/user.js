const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");
const authenticate=require('../middlewares/authenticate');
const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

router.get('/dashboard', authenticate,(req,res)=>{
    res.send('Hellow from server');
});


// router.post()


// router.p

module.exports = router;