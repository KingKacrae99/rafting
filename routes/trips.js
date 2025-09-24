const router = require('express').Router();
const tripController = require('../controllers/trips')
const utils = require('../utilities/index')
router.get('/', tripController.getTrips);
router.get('/create', utils.errorHandler(tripController.readDataToDB))
router.get('/:id', utils.errorHandler(tripController.getTripById))

module.exports = router;
