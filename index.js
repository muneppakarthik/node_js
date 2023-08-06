const express = require("express");
const app = express();
const mongoose = require("mongoose");
const BrandName = require("./model");
require("dotenv").config();

// middleware
app.use(express.json());
// add brands
app.use('/addbrands',async(req,res)=>{
    const { brandname } = req.body;
    try{
        const newData = new BrandName({brandname});
        await newData.save();
        return res.json(await BrandName.find());
    }catch(err){
        console.log(err)
    }
})
// getbrands
app.use("/getbrands",async(req,res)=>{
    try{
        const allBrands = await BrandName.find();
        return res.json({
            results: allBrands.length,
            status: true,
            message: "Data fetched successfully.",
            data: allBrands,
        })
    }catch(err){
        console.log(err)
    }
})
// delete
app.use("/deletebrand/:id",async(req,res)=>{
    try{
        await BrandName.findByIdAndDelete(req.params.id);
        return res.json({
            status: 200,
            message: "Brandname deleted successfully!",
            data: await BrandName.find()
        });
    }catch(err){
        console.log(err)
    }
})
// getbyid
app.use("/getbrand/:id",async(req,res)=>{
    try{
        const data = await BrandName.findById(req.params.id);
        return res.json(data);
    }catch(err){
        console.log(err)
    }
})
// update brands
app.use("/update/:id",async (req,res)=>{
    const data = {
        brandname: req.body.brandname
    }
    await BrandName.findByIdAndUpdate(req.params.id, data);
    return res.json({
        status: 200,
        message: "Brand name updated successfully!",
        data: await BrandName.find()
    })
})
// database
const database = ()=>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try{
        mongoose.connect(
            "mongodb+srv://karthik:h8628Hr1MlrAMo9a@brands.hrv8hko.mongodb.net/?retryWrites=true&w=majority",
            connectionParams
            );
        console.log("Database connected successfully.")
    }catch(err){
        console.log(err);
        console.log("Database failed to connect!")
    }
}
database();
app.listen(8000,(err)=>{
    if(err) throw err;
    console.log(`Server is running on 8000`)
})