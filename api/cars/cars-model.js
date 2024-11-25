const db = require('../../data/db-config')

const getAll = async () => {
  // DO YOUR MAGIC
  const result = await db('cars')
  return result
}

const getById = async(id) => {
  const result =  await db('cars').where('id',id).first()
  return result
}

const create = async(data) => {
  const [id] = await db('cars').insert(data)
  return getById(id)
}

const getByVin = async(vin)=>{
  return db('cars').where('vin',vin).first()
}

module.exports ={
  getAll,
  getById,
  create,
  getByVin
}