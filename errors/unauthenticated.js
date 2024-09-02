const {StatusCodes} = require('http-status-codes')
const CustomerAPIError = require('./custom-api')

class UnauthenticatedError extends CustomerAPIError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError