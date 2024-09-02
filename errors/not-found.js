const {StatusCodes} = require("http-status-codes")
const CustomerAPIError = require('./custom-api')

class NotFoundError extends CustomerAPIError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError