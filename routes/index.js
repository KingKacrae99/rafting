const router = require('express').Router();
const tripRoute = require('./trips');
const utils = require('../utilities/index')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/', (req,res)=>{
    res.send("hello clown (: ")
})

router.use('/trips', tripRoute);

module.exports = router;
