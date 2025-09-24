const {body,validateResult} = require('express-validator')
 
const validate = {}

validate.tripRules = async () => {
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
        .notEmpty('price is required!')
        .isFloat({gt:0})
        .withMessage('Price must be a positive number'),
        body('difficulty')
        .notEmpty()
        .isString(),
        body('capacity'),
        body('availableSpots'),
    ]
}