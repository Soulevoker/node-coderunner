// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  var DEFAULT_BACKEND_VERSION, DEFAULT_TIMEOUT_MS, _, create, getExecutionParams, getReqPayload, isTruthy;

  _ = require('lodash');

  DEFAULT_TIMEOUT_MS = 30000;

  DEFAULT_BACKEND_VERSION = 1;

  isTruthy = function(value) {
    var ref;
    if (value == null) {
      value = '';
    }
    return (ref = value.toString().toLowerCase()) === 'true' || ref === 't' || ref === '1' || ref === 'yes';
  };

  getReqPayload = function(origReqPayload, contentType) {
    var reqPayload;
    if ((contentType != null ? contentType.indexOf('application/json') : void 0) === 0 || (contentType != null ? contentType.indexOf('application/x-www-form-urlencoded') : void 0) === 0 || (contentType != null ? contentType.indexOf('multipart/form-data') : void 0) === 0 || (contentType != null ? contentType.indexOf('text/plain') : void 0) === 0) {
      reqPayload = origReqPayload;
    }
    if (!reqPayload) {
      reqPayload = {};
    }
    return reqPayload;
  };

  getExecutionParams = function(reqQuery, reqPayload) {
    var e, error, execParams;
    if (reqQuery.f) {
      execParams = {};
      if (reqQuery.params) {
        try {
          execParams = JSON.parse(reqQuery.params);
        } catch (error) {
          e = error;
          execParams = reqQuery.params;
        }
      }
    } else {
      execParams = _.assign({}, (_.isObject(reqPayload) ? reqPayload : {}), reqQuery);
      if (execParams.apikey) {
        delete execParams.apikey;
      }
    }
    return execParams;
  };

  create = function(req) {
    var deisRequestBody, new_req, params, reqPayload;
    reqPayload = getReqPayload(req.payload, req.headers['content-type']);
    params = getExecutionParams(req.query, reqPayload);
    deisRequestBody = {
      request: {
        body: _.isEmpty(reqPayload) ? '' : reqPayload,
        method: req.method.toUpperCase(),
        'content-type': req.headers['content-type']
      },
      response: {
        body: {
          request: {
            method: req.method.toUpperCase(),
            'content-type': req.headers['content-type']
          }
        }
      },
      session: {
        api_key: req.headers['x-cloudmine-apikey'] || req.query.apikey,
        app_id: req.params.appid,
        session_token: req.headers['x-cloudmine-sessiontoken'] || null,
        user_id: '[User ID not populated in local deployments]'
      },
      params: _.isEmpty(params) ? null : params,
      config: {
        async: isTruthy(req.query.async),
        timeout: 30,
        version: 2,
        type: 'post'
      },
      code: void 0
    };
    new_req = {
      payload: deisRequestBody
    };
    return new_req;
  };

  module.exports = {
    isTruthy: isTruthy,
    create: create
  };

}).call(this);