/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(message);
 * return res.ok(message, data);
 *
 * @param  {String} message
 * @param  {Object} data
 */

module.exports = function sendOK (message, data) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  sails.log.silly('res.ok() :: Sending 200 ("OK") response');

  // Set status code
  res.status(200);
  var response = {
    status: 200,
    message: (message != undefined && message !== null)?message:'',
    data: (data != undefined && data !== null)?data:{}
  };

  //always respond with JSON
  return res.jsonx(response);
};
