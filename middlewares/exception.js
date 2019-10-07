const {HttpException, ParameterException} = require('../code/http-exception')
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if(error instanceof ParameterException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ ctx.method } ${ ctx.path }`
      }
      ctx.status = error.code
    }
  }
}

module.exports = catchError