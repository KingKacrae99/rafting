const {body,validationResult} = require('express-validator')
 
const validate = {}

validate.tripRules = () => {
    return [
        body('name')
        .notEmpty().withMessage('Pls provide a name for the trip field')
        .isString()
        .escape()
        .isLength({min:4})
        .withMessage('Pls Provide a name for the name field'),

        body('description')
        .notEmpty().withMessage('Pls provide a description for the trip field')
        .isString()
        .escape()
        .isLength({min:10})
        .withMessage('Pls enter description for the description field'),
        
        body('location')
        .notEmpty().withMessage('location is required!')
        .isString()
        .escape()
        .isLength({min:5})
        .withMessage('Pls character must be more than 5'),,
        
        body('date')
        .notEmpty().withMessage('Date is required!')
        .isISO8601().withMessage('Date must be in ISO8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)')
        .toDate(),
        
        body('price')
        .notEmpty().withMessage('Price is required!')
        .isNumeric()
        .withMessage('Price must be a number'),
        
        body('difficulty')
        .notEmpty().withMessage('difficulty is required')
        .isString()
        .isIn(['Beginner','Intermediate','Advanced']).withMessage('Difficulty must be one of: Beginner, Intermediate, Advanced'),
        
        body('capacity')
        .notEmpty().withMessage('Capacity required')
        .isNumeric()
        .withMessage('Capacity must be a numeric value'),
        
        body('availableSpots')
        .notEmpty().withMessage('AvailableSpot is required')
        .isInt()
        .isNumeric()
        .withMessage('AvailableSpot must be a numeric value')
        ,
    ]
}

validate.validateResult = async (req,res,next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       return res.status(400).json({
            errors: errors.array()
        });
    }
    
    return next()
}

module.exports = validate;