/**
 * This file provide a way to get user data from username via youtube gdata or
 * from user id via google plus.
 */
var Util    = require("../../util");
var YOUTUBE = 'youtube';
var GOOGLE  = 'google';

/**
 * Get user data. You can control the request destination by using the property
 * platform of param options. There are two main value for it:
 * 1. youtube: request to gdata of youtube.
 * 2. google: request to google plus.
 * 3. If you don't define this option, the function will try to guess itself.
 * @param {Object} options
 * @param {Function} callback
 * @returns {void}
 * @throws {Error} when missing id in input, or incorrect platform define.
 */
function get(options, callback)
{
    if (!options || !options.id)
    {
        throw new Error('You must define an id to use this feature');
    }

    var platform = options.platform;
    if (!platform)
    {
        if (/^\d+$/.test(options.id))
        {
            platform = GOOGLE;
        }
        else
        {
            platform = YOUTUBE;
        }
    }
    platform = platform.toLowerCase();

    var url = '';
    var action = '';
    switch(platform)
    {
        case GOOGLE:
            action = 'people/' + options.id;
            url = Util.createUrlV1.apply(this, [action, options]);
            break;
        case YOUTUBE:
            action = 'users/' + options.id;
            url = Util.createUrlGdata.apply(this, [action, options]);
            break;
        default:
            throw new Error('Unknown platform', platform);
    }

    var reqOptions = {
        url: url
    };

    this.Client.request(reqOptions, callback);
}

module.exports = {
    get: get
};
