const express = require('express');
const errorMiddleware = require('./middlewares/errors')
const main = require('./config/connection')
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/index')
require('dotenv').config()
const Err = require('./middlewares/customError')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

/************************************
 *  Routes
 ***********************************/
app.use('/', router)


/************************************
 * Middleware
*************************************/
app.use(async (req,res,next) => {
    next(new Err("Sorry, it looks like we've lost track!",404))
});

app.use(errorMiddleware);



const port = process.env.PORT;

/****************************************
 * Calling Mongodb connection func
****************************************/
main().catch(err => { console.log(err) });


/******************************************************
 * Server event listener
******************************************************/
app.listen(port,()=>{
    console.log("Web Server running on Port: ", port)
})