const Car = require('./cars-model')
const vinCheck = require('vin-validator')

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id)
    console.log(car)
    if (car) {
      req.car = car
      next()
    }
    else {
      next({ status: 404, message: `car with id ${req.params.id} is not found` })
    }
  }
  catch (error) {
    next(error)
  }
}

const checkCarPayload = (req, res, next) => {
  try {
    const { vin, make, model, mileage, title, transmission } = req.body
    if (!vin) return next({
      status: 400,
      message: 'vin is missing'
    })
    if (!make) return next({
      status: 400,
      message: 'make is missing'
    })
    if (!model) return next({
      status: 400,
      message: 'model is missing'
    })
    if (!mileage) return next({
      status: 400,
      message: 'mileage is missing'
    })
    next()
  }
  catch (err) {
    next(err)
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body
  if (vinCheck.validate(vin)) {
    next()
  }
  else {
    next({ status: 400, message: `vin ${vin} is invalid` })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const existed = await Car.getByVin(req.body.vin)
    if (existed) {
          next({status:400,message:`vin ${req.body.vin} already exists`})
    }
    else {
        next()
    }
  }
  catch (err) {
    next(err)
  }
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}