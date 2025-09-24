const router = require('express').Router();
const tripRoute = require('./trips');
const utils = require('../utilities/index')

router.get('/', (req,res)=>{
    res.send("hello clawns")
})

router.use('/trips', tripRoute);

module.exports = router;
