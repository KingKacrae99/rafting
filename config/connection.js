const db = require('../models')

//main().catch(err => console.log(err));

async function main() {
  await db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to database")

}

module.exports = main;
