/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(message);
 * return res.badRequest(message, data);
 * return res.badRequest(message, data, error);
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   {page: 'trial/signup'}
 * );
 * ```
 *
 * NOTE:
 *
 * error, if passed, is shown only if the environment is not production.
 * It is, however, always logged
 */

module.exports = function badRequest(message, data, error) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(400);

  // Log error to console
  if (error !== undefined) {
    sails.log.error('Sending 400 ("Bad Request") response: \n',error);
  }
  else sails.log.verbose('Sending 400 ("Bad Request") response');

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'production') {
    error = undefined;
  }

  var response = {
    status: 400,
    message: (message != undefined && message !== null)?message:'404 Not Found',
    data: (data != undefined && data !== null)?data:{}
  };

  if(error != undefined) {
    response.error = error;
  }

  //always respond with JSON
  return res.jsonx(response);
};

