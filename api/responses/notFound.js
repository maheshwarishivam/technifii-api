/**
 * 404 (Not Found) Handler
 *
 * Usage:
 * return res.notFound();
 * return res.notFound(message);
 * return res.notFound(message,data);
 * return res.notFound(message,data,error);
 *
 * e.g.:
 * ```
 * return res.notFound();
 * ```
 *
 * NOTE:
 *
 * error, if passed, is shown only if the environment is not production.
 * It is, however, always logged
 *
 * If a request doesn't match any explicit routes (i.e. `config/routes.js`)
 * or route blueprints (i.e. "shadow routes", Sails will call `res.notFound()`
 * automatically.
 */

module.exports = function notFound (message, data, error) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(404);

  // Log error to console
  if (error !== undefined) {
    sails.log.error('Sending 404 ("Not Found") response: \n',error);
  }
  else sails.log.verbose('Sending 404 ("Not Found") response');

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'production') {
    error = undefined;
  }

  var response = {
    status: 404,
    message: (message != undefined && message !== null)?message:'404 Not Found',
    data: (data != undefined && data !== null)?data:{}
  };

  if(error != undefined) {
    response.error = error;
  }

  //always respond with JSON
  return res.jsonx(response);
};

