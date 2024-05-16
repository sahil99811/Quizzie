const express=require('express');
const app=express();

const dotenv=require('dotenv');

dotenv.config();

app.listen(process.env.PORT,()=>{
     console.log(`server is started successfully at PORT No ${process.env.PORT}`);
})