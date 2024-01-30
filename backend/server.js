const express=require("express");
const {connectToMongoDB}=require('./connect')
const app=express();
const PORT=5000;
const urlRoute=require('./routes/url')
const userRoute=require('./routes/user')
const URL=require('./models/url')
const User=require('./models/user')
const cors=require('cors');
app.use(cors());
connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>console.log('Mongodb connected'))
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use('/url',urlRoute);
app.use('/user',userRoute);
app.get('/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            }
        }
    })
})
app.listen(PORT,()=>console.log(`server started at PORT:${PORT}`));



// app.listen