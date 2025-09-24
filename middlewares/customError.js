class Err extends Error {
    constructor(message,status){
        super(message)
        this.status = status;
        this.isVisible = true;
    }
}

module.exports = Err;