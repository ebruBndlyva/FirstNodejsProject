// const express = require("express")
import express from "express"
const app = express() 
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"
// const mongoose = require("mongoose")
// const bodyParser = require("body-parser")
// const dotenv = require("dotenv")
// const cors = require("cors");
app.use(bodyParser.json())
app.use(cors())
dotenv.config()
app.get("/", (req, res) => {
    res.send("welcome")
})
let ProductShema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
})
let ProductModel = mongoose.model("products", ProductShema)
app.get("/products", async (req, res) => {
    let products = await ProductModel.find()
    res.send(products)
})

app.get("/products/:id", async (req, res) => {
    let { id } = req.params
    let product = await ProductModel.findById(id)
    res.send({
        message: "Succes getById",
        data: product
    })
})


app.delete("/products/:id", async (req, res) => {
    let { id } = req.params
    await ProductModel.findByIdAndDelete(id)
    res.send({
        message: "Succes Delete",

    })
})




app.post("/products", async (req, res) => {
    let newProduct = ProductModel(req.body)
    await newProduct.save()
    res.send({
        message: "Success Post",
        data: req.body
    })
})
 


mongoose.connect(process.env.ConnectionString)
    .then(() => {
        console.log("connected");
    })
app.listen(3000, () => { 
    console.log("bu app 3000 portunda dinlenilir") 
})