/**
 *  Copyright 2013 Ionică Bizău
 *
 *  A Node.JS module, which provides an object oriented wrapper for the Youtube v3 API.
 *  Author: Ionică Bizău <bizauionica@gmail.com>
 *
 **/

var Util            = require("util");
var querystring     = require("querystring");
var API_URL         = "https://www.googleapis.com/youtube/v3/";
var API_URL_V1      = "https://www.googleapis.com/plus/v1/";
var API_URL_GDATA   = "https://gdata.youtube.com/feeds/api/";

function getAuth(options)
{
    var auth = this.Client.getConfig().auth || {};

    switch (auth.type)
    {
        case 'key':
            options.key = auth.key;
            break;
        case 'oauth':
            options.access_token = auth.token;
            break;
        default:
            throw new Error('Unknown auth type', auth.type);
    }

    return options;
}

function createUrl(api, options)
{
    var url = API_URL + api;
    options = getAuth.call(this, options);

    var i = -1;
    for (var opt in options)
    {
        if (options[opt] === undefined)
        {
            continue;
        }
        var value = options[opt];
        url += (++i === 0 ? "?" : "&") + opt + "=" + value;
    }

    return url;
}

function createUrlV1(action, options)
{
    options = getAuth.call(this, options);
    var url = API_URL_V1 + action + '?' + querystring.stringify(options);
    return url;
}

function createUrlGdata(action, options)
{
    options = getAuth.call(this, options);
    var url = API_URL_GDATA + action + '?' + querystring.stringify(options);
    return url;
}

module.exports = {
    createUrl: createUrl,
    createUrlV1: createUrlV1,
    createUrlGdata: createUrlGdata
};
