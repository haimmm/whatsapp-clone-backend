const ServerError = require('./serverError')

const errorHandler = (err, req, res, next) => {
  if (err instanceof ServerError) {
    console.log("[ServerError error] ", err);
    res.status(err.code)
    res.json({ error: err.message })
  }else{
    console.log("[unknown error] ", err);
    res.status(500)
    res.json({ error: "Something went wrong" })
  }
}

module.exports =  errorHandler ;


