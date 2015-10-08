/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(message);
 * return res.forbidden(message,data);
 * return res.forbidden(message,data,error);
 *
 * e.g.:
 * ```
 * return res.forbidden('Access denied.');
 * ```
 *
 * NOTE:
 *
 * error, if passed, is shown only if the environment is not production.
 * It is, however, always logged
 */

module.exports = function forbidden (message, data, error) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(403);

  // Log error to console
  if (error !== undefined) {
    sails.log.error('Sending 403 ("Forbidden") response: \n',error);
  }
  else sails.log.verbose('Sending 403 ("Forbidden") response');

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'production') {
    error = undefined;
  }

  var response = {
    status: 403,
    message: (message != undefined && message !== null)?message:'403 Forbidden',
    data: (data != undefined && data !== null)?data:{}
  };

  if(error != undefined) {
    response.error = error;
  }

  //always respond with JSON
  return res.jsonx(response);
};

