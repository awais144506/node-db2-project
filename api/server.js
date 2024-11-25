const express = require("express")
const routerCars = require('./cars/cars-router')
const server = express()

// DO YOUR MAGIC
server.use(express.json())
server.use('/api/cars', routerCars)
module.exports = server
