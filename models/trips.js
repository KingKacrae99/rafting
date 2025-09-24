module.exports = (mongoose) => {
  const Trips = mongoose.model(
    'trips',
    mongoose.Schema(
      {      
        name: String, 
        description: String,
        location : String,  
        date : Date,  
        price : Number,  
        difficulty : {
          type: String,
          enum: ['Beginner','Intermediate','Advanced']
        },  
        capacity: Number,  
        availableSpots : Number,  
        createdAt: Date,
        updatedAt : Date
      }
    )
  );

  return Trips;
};