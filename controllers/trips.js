const Err = require('../middlewares/customError')
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
      return next(new Err('No data was inserted', 400))

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
      return next(new Err('Invalid trip Id', 400))
    }
    const result = await db.trips.findById(tripId)
    if(!result){
      return next(new Err('Data not found', 404))
    }

    // return's pnly the document
    return res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

/**********************************************
 * Add Trip Function
**********************************************/
const addTrip = async(req,res,next) =>{
  try {
    if(!req.body){
      return next(new Err('No data was provided',400));
    }
    const currentDate = new Date();
    const timeStamp = currentDate.toISOString()
    const trip = {
      name: req.body.name,
      description: req.body.description,
      location : req.body.location,
      date: req.body.date,
      price: req.body.price,
      difficulty: req.body.difficulty,
      capacity: req.body.capacity,
      availableSpots: req.body.availableSpots,
      createdAt: timeStamp,
      updatedAt: null
    };
    const result = await db.trips.create(trip);
    if(result){
      return res.status(200).json({
        status: 'success',
        message: 'Trip successfully added',
        result,
      })
    }
    return next(new Err('Add trip process failed', 400))
  } catch (err) {
    next(err)
  }
}

/******************************************
 *  Update Trip by Id
*******************************************/
const updateTripById = async(req,res,next) => {
  try {
    const tripId = req.params.id;
    if(!Types.ObjectId.isValid(tripId)){
      return next(new Err('Invalid trip ID', 400))
    }
    // retrieve data 
    const data = await db.trips.findById(tripId);

    if( data){
      const currentDate = new Date();
      const timeStamp = currentDate.toISOString()

      const trip = {
        name: req.body.name,
        description: req.body.description,
        location : req.body.location,
        date: req.body.date,
        price: req.body.price,
        difficulty: req.body.difficulty,
        capacity: req.body.capacity,
        availableSpots: req.body.availableSpots,
        createdAt: data.createdAt,
        updatedAt: timeStamp
      }

      // update retrieved data
      const result = await db.trips.replaceOne({_id: tripId},trip)
      if ( result.modifiedCount === 0){
        return next(new Err('Update process failed', 400))
      }
      return res.status(200).json({
        status: 'success',
        message: 'Trip updated successfully',
        result,
      })
    }

    return next(new Err('Trip has been deleted or does not exist.', 404));

  } catch (err) {
    next(err)
  }
}

/*******************************************
 * Delete Trip by Id
********************************************/
const deleteTripById = async(req,res,next) => {
  try {
    const tripId = req.params.id
    if (!Types.ObjectId.isValid(tripId)){
      return next(new Err('Invalid trip ID',400))
    }
    const result = await db.trips.findByIdAndDelete(tripId)
    if(!result){
      return next(new Err('Trip not found or has already been deleted',404))
    } 
    return res.status(200).json({
      status: 'Successful',
      result: result,
      message: "Trip deleted successfully"
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {getTrips, getTripById,
   readDataToDB, addTrip,
    updateTripById, deleteTripById};