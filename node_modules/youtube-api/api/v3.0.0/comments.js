/**
 *  Copyright 2015 Just4Fun
 *
 *  A Node.JS module, which provides an object oriented wrapper for the Youtube v3 API.
 *  Author: Just4Fun <tranhoangnhat5683@gmail.com>
 *
 * User profile by user id_social
 * https://www.googleapis.com/plus/v1/people/<id_social>?key=<key>
 * Reply of comment
 * https://www.googleapis.com/plus/v1/activities/<id_social>/comments?key=<key>
 **/

var Util = require("../../util");

function list (options, callback) {
    var action = 'activities/' + options.id + '/comments';
    var url = Util.createUrlV1.apply(this, [action, options]);
    var reqOptions = {
        url: url
    };

    this.Client.request(reqOptions, callback);
}

function get (options, callback) {
    var action = 'activities/' + options.id;
    var url = Util.createUrlV1.apply(this, [action, options]);
    var reqOptions = {
        url: url
    };

    this.Client.request(reqOptions, callback);
}

module.exports = {
    list: list,
    get: get
};
