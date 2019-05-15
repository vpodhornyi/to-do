const validate = require('./index');

function isValid(scheme) {
  return function middleware(req, res, next) {
    const validationResult = validate(scheme, req.body);

    if (validationResult.valid) {
      next();
    } else {
      res.status(400);
      res.send({ code: 400, type: 'error', message: 'Invalid data', errors: validationResult.errors });
    }
  };
}

module.exports = isValid;