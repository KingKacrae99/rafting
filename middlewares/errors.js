const errorMiddleware = async(err,req,res,next) => {
    console.log("error: ", err)
    if(err.isVisible){
        return res.status(err.status).json({
            status : 'fail',
            message: err.message
        });
    }

    res.status(500).json({
        status: 'Server Error ',
        message : "Oops! something went wrong." 
    });
}

module.exports = errorMiddleware;