class CustomerAPIError extends Error {
    constructor (message) {
        super(message)
    }
}

module.exports = CustomerAPIError