const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
require('dotenv').config();
const jwt=require('jsonwebtoken')
// import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        cPassword:{
            type:String,
            required:true,
        },
        tokens:[
            {
                token:{
                    type:String,
                    required:true,
                }
            }
        ]
    },
    {
        timestamps:true
    }
);



// we are hashing the password
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,12);
        this.cPassword=await bcrypt.hash(this.cPassword,12);
    }
    next();
})


// we are generating token
userSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token;
    }
    catch(err){
        console.log(err);
        console.log('3232');
    }
}

const User=mongoose.model('USER',userSchema);

module.exports=User;