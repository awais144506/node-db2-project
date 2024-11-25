// DO YOUR MAGIC
const express = require('express')
const Car = require("./cars-model")
const { checkCarId, checkCarPayload,checkVinNumberUnique,checkVinNumberValid } = require('./cars-middleware')

const router = express.Router()



router.get('/', (req, res) => {
    Car.getAll()
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', checkCarId, (req, res, next) => {
    Car.getById(req.params.id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/', checkCarPayload,checkVinNumberValid,checkVinNumberUnique, (req, res, next) => {
    Car.create({
        vin:req.body.vin,
        make:req.body.make,
        model:req.body.model,
        mileage:req.body.mileage,
        title:req.body.title,
        transmission:req.body.transmission
    })
    .then(car=>{
        res.status(201).json(car)
    })
    .catch(next)
})




router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    })
})



module.exports = router