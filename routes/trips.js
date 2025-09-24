const router = require('express').Router();
const tripController = require('../controllers/trips')
const utils = require('../utilities/index')

router.get('/', tripController.getTrips);
router.post('/create', utils.errorHandler(tripController.readDataToDB))
router.get('/:id', utils.errorHandler(tripController.getTripById))
router.post('/add', utils.errorHandler(tripController.addTrip))
router.put('/edit/:id', utils.errorHandler(tripController.updateTripById))
router.delete('/delete/:id', utils.errorHandler(tripController.deleteTripById))

module.exports = router;
