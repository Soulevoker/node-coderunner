// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  var localReply;

  localReply = function(reply, unwrapResult) {
    if (unwrapResult) {
      return reply;
    }
    return function() {
      var err, payload;
      if (arguments[1]) {
        err = arguments[0];
        payload = arguments[1];
      } else {
        payload = arguments[0];
      }
      payload = {
        result: payload
      };
      if (err) {
        return reply(err, payload);
      }
      return reply(payload);
    };
  };

  module.exports = localReply;

}).call(this);
