const Err = require('../middlewares/customError');
const db = require('../models/index')
const fs = require('fs').promises
const path = require('path')
const {Types} = require('mongoose')

/*************************************************
 * Populate collection 
***************************************************/
const readDataToDB = async (req,res,next) => {
    try {
      const file= path.resolve('./trips.json')
      const data = await fs.readFile(file, 'utf-8');
      if(!data){
        return next(new Err('File not found!', 404))
      } 
      const jsObj = JSON.parse(data)
      const result = await db.trips.insertMany(jsObj)
      if( result.length > 0){
        console.log("Trips Table successfully populated")
        return res.status(200).json(result)
      }
      return next(new Err('No data inserted', 400))

    } catch (error) {
        next(error)
    }
}

/*******************************************
 * Retrieve All Trips
********************************************/
const getTrips = async(req,res,next)=>{
    try {
       const result = await db.trips.find();

       if(result.length > 0){
         return res.status(200).json(result)
       }

       return next(new Err('No data found', 404));

    } catch (error) {
        next(error)
    }
}

/********************************************
* Retrieve Trip by ID
*********************************************/
const getTripById = async (req,res,next)=>{
  try {

    const tripId = req.params.id
    if (!Types.ObjectId.isValid(tripId)){
      return next(new Err('Invalid trip Id', 404))
    }
    const  result = await db.trips.findById(tripId)
    if(!result){
      next(new Err('Data not found', 404))
    }

    // return's pnly the document
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}


module.exports = {getTrips, getTripById, readDataToDB};