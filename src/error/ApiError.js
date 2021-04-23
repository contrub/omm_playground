class ApiError extends Error {
  constructor(code, message, error) {
    super(error)
    this.statusCode = code
    this.message = message
  }

  static custom(statusCode, msg) {
    return new ApiError(statusCode, msg)
  }

  static badRequest(msg) {
    return new ApiError(400, msg)
  }

  static internal(msg) {
    return new ApiError(500, msg)
  }
}

module.exports = ApiError
