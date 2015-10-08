/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(message);
 * return res.serverError(message,data);
 * return res.serverError(message,data,error);
 *
 * NOTE:
 *
 * error, if passed, is shown only if the environment is not production.
 * It is, however, always logged
 *
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.serverError()`
 * automatically.
 */

module.exports = function serverError (message, data, error) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(500);

  // Log error to console
  if (error !== undefined) {
    sails.log.error('Sending 500 ("Server Error") response: \n',error);
  }
  else sails.log.verbose('Sending 500 ("Server Error") response');

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'production') {
    error = undefined;
  }

  var response = {
    status: 500,
    message: (message != undefined && message !== null)?message:'500 Server Error',
    data: (data != undefined && data !== null)?data:{}
  };

  if(error != undefined) {
    response.error = error;
  }

  //always respond with JSON
  return res.jsonx(response);
};

