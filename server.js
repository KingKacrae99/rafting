const express = require('express');
const bodyParser = require('body-parser');
const main = require('./config/connection')
const router = require('./routes/index')
const errorMiddleware = require('./middlewares/errors')
const app = express();
require('dotenv').config()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

/************************************
 * Middleware
*************************************/
app.use(async (err,req,res,next) => {
    next({status: 404, message:"Sorry, it looks like we've lost track!"})
});
app.use(errorMiddleware);

/************************************
 *  Routes
 ***********************************/
app.use('/', router)

const port = process.env.PORT;

/****************************************
 * Calling Mongodb connection func
****************************************/
main().catch(err => { console.log(err)});

/******************************************************
 * Server event listener
******************************************************/
app.listen(port,()=>{
    console.log("Web Server running on Port: ", port)
})