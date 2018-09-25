'use strict';

/**
 * @file Response middleware
 * @author Nikola Miljkovic <mnikson@gmail.com>
 * @version 1.0
 */

/**
 * Middleware for API response i.e. headers, versions
 * This is for V3
 * @param {Object} req Request
 * @param {Object} req Response
 * @param {Function} next Callback function
 */
exports.sendV3 = function (req, res, next) {
  var baseUrl = req.connection.encrypted ? 'https://' : 'http://';
  baseUrl += req.headers.host;

  var response = {};

  response.links = {
    self: baseUrl + req.url
  };

  res.response = response;
  return next();
};

/**
 * Reponse for fetching data
 * @param {Object} req Request
 * @param {Object} req Response
 * @param {Object} data Data for response
 */
exports.fetchingResponseV3 = function (req, res, data) {
  res.send({
    links: {
      self: res.response.links.self
    },
    data: data || []
  });
};

/**
 * Paginate response for V3
 *
 * @param {Function} req Request
 * @param {Function} res Response
 * @param {Object} data
 */
exports.paginateV3 = function (req, res, data) {
  res.paginate.sendPaginated(data);
};