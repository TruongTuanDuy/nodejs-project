
class ErrorCustom extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class BadRequestError extends ErrorCustom {
    constructor(message, status = 400) {
        super(message, status)
    }
}

class AuthentificationError extends ErrorCustom {
    constructor(message, status = 401) {
        super(message, status)
    }
}


module.exports = { ErrorCustom, BadRequestError, AuthentificationError }