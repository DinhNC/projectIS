/*!
 * solr client
 * Copyright(c) 2011-2012 HipSnip Limited
 * Author Rémy Loubradou <remyloubradou@gmail.com>
 * MIT Licensed
 */
 
/**
 * Load dependencies
 */

var http = require('http'),
   Query = require('./query'),
   querystring = require('querystring'),
   format = require('./utils/format'),
   SolrError = require('./error/solr-error'),
   JSONStream = require('JSONStream'),
   duplexer = require('duplexer'),
   request = require('request');

http.globalAgent.maxSockets = 20;
/**
 * Expose `createClient()`.
 */
 
exports.createClient	= createClient;
exports.createAdmin		= createAdmin;
exports.createZookeeper = createZookeeper;

/**
 * Create an instance of `Client`
 *
 * @param {String|Object} [host='127.0.0.1'] - IP address or host address of the Solr server
 * @param {Number|String} [port='8983'] - port of the Solr server
 * @param {String} [core=''] - name of the Solr core requested
 * @param {String} [path='/solr'] - root path of all requests
 *
 * @return {Client}
 * @api public
 */

function createClient(host, port, core, path){
  var options = (typeof host === 'object')? host : {
      host : host,
      port : port,
      core : core,
      path : path
   };
  return new Client(options);
}

function createAdmin(host, port, path){
  var options = (typeof host === 'object')? host : {
      host : host,
      port : port,
      path : path
   };
  return new Admin(options);
}


function createZookeeper(host, port, path){
  var options = (typeof host === 'object')? host : {
      host : host,
      port : port,
      path : path
   };
  return new Zookeeper(options);
}

/**
 * Create a new `Client`
 * @constructor
 *
 * @param {Object} options - set of options used to request the Solr server
 * @param {String} options.host - IP address or host address of the Solr server
 * @param {Number|String} options.port - port of the Solr server
 * @param {String} options.core - name of the Solr core requested
 * @param {String} options.path - root path of all requests
 * 
 * @return {Client}
 * @api private
 */
 
var Client = function(options){
   this.options = {
      host : options.host || '127.0.0.1',
      port : options.port || '8983',
      core : options.core || '',
      path : options.path || '/solr'
   };
   this.data = {};
   this.autoCommit = false;
   this.overwrite = false;
}


/**
 * Create a new `Admin`
 * @constructor
 *
 * @param {Object} options - set of options used to request the Solr server
 * @param {String} options.host - IP address or host address of the Solr server
 * @param {Number|String} options.port - port of the Solr server
 * @param {String} options.path - root path of all requests
 * 
 * @return {Admin}
 * @api private
 */

var Admin = function(options)
{
	this.options = {
      host : options.host || '127.0.0.1',
      port : options.port || '8983',
      path : options.path || '/solr/admin'
   };   
};

Admin.prototype.basicAuth = function(username, password)
{
	Client.prototype.basicAuth.call(this, username, password);
};

Admin.prototype.unauth = function()
{
	Client.prototype.unauth.call(this);
};

Admin.prototype.getCores = function(callback) {
    
    var adminPath = this.options.path;
	if (adminPath.charAt(adminPath.length - 1) !== '/')
	{
		adminPath += '/';
	}
    this.options.fullPath = adminPath + 'cores?wt=json';
    
    queryRequest(this.options, callback);
};

Admin.prototype.createCore = function(options, callback)
{
	this._validateOptions(options);
	var params = {};
	params['action'] = 'CREATE';
	for (var k in options)
	{
		params[k] = options[k];
	}
	var queries = [];
	for (var k in params)
	{
		queries.push(k + '=' + params[k]);
	}
	var adminPath = this.options.path;
	if (adminPath.charAt(adminPath.length - 1) !== '/')
	{
		adminPath += '/';
	}
	this.options.fullPath = adminPath + 'cores?wt=json&' + queries.join('&');

	queryRequest(this.options, callback);
};

Admin.prototype.unloadCore = function(options, callback)
{
    if( !options )
	{
		throw new Error('The options should not be empty');
	}
	if( !options['core'] || typeof options['core'] !== 'string' )
	{
		throw new Error('The "core" option should not be an empty string.');
	}
    
	var params = {
        action              : 'UNLOAD',
        deleteIndex         : 'false',
        deleteDataDir       : 'false',
        deleteInstanceDir   : 'false'
    };
    
	for (var k in options)
	{
		params[k] = options[k];
	}
	var queries = [];
	for (var k in params)
	{
		queries.push(k + '=' + params[k]);
	}
	var adminPath = this.options.path;
	if (adminPath.charAt(adminPath.length - 1) !== '/')
	{
		adminPath += '/';
	}
	this.options.fullPath = adminPath + 'cores?' + queries.join('&');
	queryRequest(this.options, callback);
};

Admin.prototype.createShard = function(options, callback) {
    if( !options )
	{
		throw new Error('The options should not be empty');
	}
	if( !options['collection'] || !options['shard'] )
	{
		throw new Error('Create shard must be have collection and shard name');
	}
    
    var params = {};
	params['action'] = 'CREATESHARD';
	for (var k in options)
	{
		params[k] = options[k];
	}
	var queries = [];
	for (var k in params)
	{
		queries.push(k + '=' + params[k]);
	}
	var adminPath = this.options.path;
	if (adminPath.charAt(adminPath.length - 1) !== '/')
	{
		adminPath += '/';
	}
	this.options.fullPath = adminPath + 'collections?' + queries.join('&');
	queryRequest(this.options, callback);
};

Admin.prototype._validateOptions = function(options)
{
	if( !options )
	{
		throw new Error('The options should not be empty');
	}
	if( !options['name'] || typeof options['name'] !== 'string' )
	{
		throw new Error('The "name" option should not be an empty string.');
	}
	if( !options['dataDir'] || typeof options['dataDir'] !== 'string' )
	{
		throw new Error('The "dataDir" option should not be an empty string.');
	}
	if( !options['instanceDir'] || typeof options['instanceDir'] !== 'string' )
	{
		throw new Error('The "instanceDir" option should not be an empty string.');
	}
	if( !options['config'] || typeof options['config'] !== 'string' )
	{
		throw new Error('The "config" option should not be an empty string.');
	}
	if( !options['schema'] || typeof options['schema'] !== 'string' )
	{
		throw new Error('The "schema" option should not be an empty string.');
	}
	for(var k in options)
	{
		if( ['name','dataDir', 'instanceDir', 'config', 
            'schema', 'coreNodeName', 'collection', 'shard'].indexOf(k) === -1 )
		{
			throw new Error('Does not accept param: "'+ k +'"');
		}
	}
};


var Zookeeper = function(options)
{
	this.options = {
      host : options.host || '127.0.0.1',
      port : options.port || '8983',
      path : options.path + '/zookeeper'
   };   
};

Zookeeper.prototype.basicAuth = function(username, password)
{
	Client.prototype.basicAuth.call(this, username, password);
};

Zookeeper.prototype.unauth = function()
{
	Client.prototype.unauth.call(this);
};

Zookeeper.prototype.get = function(options, callback) {
    var params = {};
	for (var k in options)
	{
		params[k] = options[k];
	}
	var queries = [];
	for (var k in params)
	{
		queries.push(k + '=' + params[k]);
	}
    
    var adminPath = this.options.path;

	this.options.fullPath = adminPath + '?' + queries.join('&');

	queryRequest(this.options, callback);
};

Zookeeper.prototype.getClusterState = function(collection, callback) {
    var opts = {
        detail: 'true',
        path: '/clusterstate.json'
    }
    this.get(opts, function(err, result) {
        if (result) {
            result = JSON.parse(result.znode.data);
            if (result[collection]) {
                result = result[collection];
            } else {
                callback({
                    name        : 'SolrError',
                    message     : 'Collection not found',
                    code        : 404
                }, null);
            }
        }
        callback(err, result);
    });
};

/**
 * Create credential using the basic access authentication method
 *
 * @param {String} username
 * @param {String} password
 *
 * @return {Client}
 * @api public
 */

Client.prototype.basicAuth = function(username,password){
   var self = this;
   this.options.authorization = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
   return self;
}

/**
 * Remove authorization header
 *
 * @return {Client}
 * @api public
 */

Client.prototype.unauth = function(){
   var self = this;
   delete this.options.authorization;
   return self;
}
 
/**
 * Add a document or a list of documents
 * 
 * @param {Object|Array} doc - document or list of documents to add into the Solr database
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 *
 * @return {Client}
 * @api public 
 */ 

Client.prototype.add = function(docs,callback){
   var self = this;
   docs = format.dateISOify(docs); // format `Date` object into string understable for Solr as a date.
   docs = Array.isArray(docs) ? docs : [docs];
   this.update(docs,callback);
   return self;
}

/**
 * Add the remote resource located at the given path `options.path` into the Solr database.
 * 
 * @param {Object} options -
 * @param {String} options.path - path of the file. HTTP URL, the full path or a path relative to the CWD of the running solr server must be used.
 * @param {String} [options.format='xml'] - format of the resource. XML, CSV or JSON formats must be used.
 * @param {String} [options.contentType='text/plain;charset=utf-8'] - content type of the resource
 * @param {Object} [options.parameters] - set of extras parameters pass along in the query. 
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 *
 * @return {Client}
 * @api public
 */

Client.prototype.addRemoteResource = function(options,callback){
   var self = this;
   options.parameters = options.parameters || {};
   options.format = (options.format === 'xml' ? '' : options.format || ''); // reason: the default route of the XmlUpdateRequestHandle is /update and not /update/xml.
   options.parameters.commit = (options.parameters.commit === undefined ? this.autoCommit : options.parameters.commit);
   options.parameters['stream.contentType'] = options.contentType || 'text/plain;charset=utf-8';
   if(options.path.match(/^https?:\/\//)){
      options.parameters['stream.url'] = options.path;
   }else{
      options.parameters['stream.file'] = options.path;
   }
   var path = 'update/' + options.format.toLowerCase()  + '?' + querystring.stringify(options.parameters) + '&wt=json';
   this.options.fullPath = [this.options.path, this.options.core, path]
                              .filter(function(element){
                                 if(element) return true;
                                 return false;    
                              })
                              .join('/');
   queryRequest(this.options,callback);
   return self;
}

/**
 * Create a writable/readable `Stream` to add documents into the Solr database
 *
 * return {Stream}
 * @api public
 */

Client.prototype.createAddStream = function(){
   var path = [this.options.path,this.options.core,'update/json?commit='+ this.autoCommit +'&wt=json']
      .filter(function(element){
         if(element) return true;
         return false;    
      })
      .join('/');
   var headers = {
      'content-type' : 'application/json',
      'charset' : 'utf-8'
   };
   if(this.options.authorization){ 
      headers['authorization'] = this.options.authorization;
   }
   var optionsRequest = {
      url : 'http://' + this.options.host +':' + this.options.port + path ,
      method : 'POST',
      headers : headers
   };
   var jsonStreamStringify = JSONStream.stringify();
   var postRequest = request(optionsRequest);
   jsonStreamStringify.pipe(postRequest);
   var duplex = duplexer(jsonStreamStringify,postRequest);
   return duplex ;
}

/**
 * Commit last added and removed documents, that means your documents are now indexed.
 *
 * @param {Object} options 
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 *
 * @return {Client}
 * @api private
 */ 
 
Client.prototype.commit = function(options,callback){
   if(callback === undefined){
      callback = options;
      options = undefined;
   }
   this.data = {};
   this.data['commit'] = {};
   
   if( options !== undefined ){
      var availableAttributes = ['waitFlush','waitSeacher', 'softCommit'];
      for ( var i = 0; i < availableAttributes.length ; i++){
         if ( options[availableAttributes [i]] !== undefined ){
            this.data['commit'][availableAttributes[i]] = options[availableAttributes[i]];
         }
      }
   }
   this.update(this.data,callback);
}

/**
 * Delete documents based on the given `field` and `text`.
 *
 * @param {String} field
 * @param {String} text
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 *
 * @return {Client}
 * @api public
 */ 
 
Client.prototype.delete = function(field,text,callback) {
   var self = this;
   text = format.dateISOify(text);
   this.data = {};
   this.data['delete'] =  {query : field +  ':'  + text};
   this.update(this.data,callback);
   return self;
}

/**
 * Delete a range of documents based on the given `field`, `start` and `stop` arguments.
 *
 * @param {String} field
 * @param {String|Date} start
 * @param {String|Date} stop
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 *
 * @return {Client}
 * @api public
 */ 
 
Client.prototype.deleteByRange = function(field,start,stop,callback){
   var self = this;
   start = format.dateISOify(start);
   stop = format.dateISOify(stop);
   this.data = {};
   this.data['delete'] = { query : field + ':[' + start + ' TO ' + stop + ']' };
   this.update(this.data,callback);
   return self;
}

/**
 * Delete the document with the given `id`
 *
 * @param {String|Number} id - id of the document you want to delete
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 *
 * @return {Client}
 * @api public
 */ 
 
Client.prototype.deleteByID = function(id,callback){
   var self = this;
   this.data = {};
   this.data['delete'] =  {id : id.toString()};
   this.update(this.data,callback); 
   return self;
}

/**
 * Delete documents matching the given `query`
 *
 * @param {String} query - 
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 *
 * @return {Client}
 * @api public
 */

Client.prototype.deleteByQuery = function(query,callback){
   var self = this;
   this.data = {};
   this.data['delete'] =  {query : query};
   this.update(this.data,callback);
   return self;
}
 
/**
 * Optimize the index
 *
 * @param {Object} options - 
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 *
 * @return {Client}
 * @api public
 */ 
 
Client.prototype.optimize = function(options,callback){
   if(callback === undefined){
      callback = options;
      options = undefined;
   }
   this.data = {};
   this.data['optimize'] = {};
   if( options !== undefined ){
      var availableAttributes = ['waitFlush','waitSearcher'];
      for ( var i = 0; i < availableAttributes.length ; i++){
         if ( options[availableAttributes [i]] !== undefined ){
            this.data['optimize'][availableAttributes[i]] = options[availableAttributes[i]];
         }
      }
   }
   this.update(this.data,callback);
}

/**
 * Rollback all add/delete commands made since the last commit.
 *
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 * 
 * @return {Client}
 * @api public
 */
 
Client.prototype.rollback = function(callback){
   this.data = {};
   this.data['rollback'] = {};
   this.update(this.data,callback);
}

/**
 * Send an update command to the Solr server with the given `data` stringified in the body.
 *
 * @param {Object} data - data sent to the Solr server
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 *
 * @return {Client}
 * @api private
 */
  
Client.prototype.update = function(data,callback){
   var self = this;
   this.options.json = JSON.stringify(data);
   var commit = 'commit='+ this.autoCommit;
   if( this.commitWithin )
   {
   	commit = 'commitWithin='+this.commitWithin;
   }
   else if( this.softCommit )
   {
   	commit = 'softCommit='+this.softCommit;
   }
   var param = 'update?'+ commit +'&wt=json';
   if (this.overwrite===true) {
       param += '&overwrite=true';
   }
   this.options.fullPath = [this.options.path,this.options.core,param]
                              .filter(function(element){
                                 if(element) return true;
                                 return false;    
                              })
                              .join('/');
   updateRequest(this.options,callback);
   return self;
}

/**
 * Search documents matching the `query`
 * 
 * @param {Query|String} query 
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 *
 * @return {Client}
 * @api public
 */ 

Client.prototype.search = function(query,callback){
   var self = this;
   // Allow to be more flexible allow query to be a string and not only a Query object
   var parameters = query.build ? query.build() : query;
   this.options.fullPath = [this.options.path,this.options.core,'select?' + parameters + '&wt=json']
                              .filter(function(element){
                                 if(element) return true;
                                 return false;    
                              })
                              .join('/'); ;
   queryRequest(this.options,callback);
   return self;
}

/**
 * Create an instance of `Query`
 *
 * @return {Query}
 * @api public
 */
 
Client.prototype.createQuery = function(){
   return new Query();
}


/**
 * Ping the Solr server
 *
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 *
 * @return {Client}
 * @api public
 */
 
Client.prototype.ping = function(callback){
   var self = this;
   this.options.fullPath = [this.options.path,this.options.core,'admin/ping?wt=json']
                              .filter(function(element){
                                 if(element) return true;
                                 return false;    
                              })
                              .join('/');
   queryRequest(this.options,callback);
   return self;
}

/**
 * HTTP POST request. Send update commands to the Solr server (commit, add, delete, optimize)
 * 
 * @param {Object} params
 * @param {String} params.host - IP address or host address of the Solr server
 * @param {Number|String} params.port - port of the Solr server
 * @param {String} params.core - name of the Solr core requested
 * @param {String} params.authorization - value of the authorization header
 * @param {String} params.fullPath - full path of the request
 * @param {String} params.json
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 *
 * @api private
 */
 
var updateRequest = function(params,callback){
   var headers = {
      'content-type' : 'application/json',
      'charset' : 'utf-8',
      'content-length':  Buffer.byteLength(params.json),
   };
   if(params.authorization){ 
      headers['authorization'] = params.authorization;
   }
   var options = {
      host : params.host,
      port : params.port,
      method : 'POST',
      headers : headers,
      path : params.fullPath 
   };
   
   var callbackResponse = function(res){
      var buffer = '';
      var err = null;
      res.on('data',function(chunk){
         buffer += chunk;
      });
      
      res.on('end',function(){
         if(res.statusCode !== 200){
            err = new SolrError(res.statusCode,buffer);
            if (callback)  callback(err,null);
         }else{
            try{
               var data = JSON.parse(buffer);
            }catch(error){
               err = error;
            }finally{
               if (callback)  callback(err,data);
            }
         }
      });
   }
   
   var request = http.request(options,callbackResponse);
   
   request.on('error',function(err){
      if (callback) callback(err,null);
   });
   request.write(params.json);
   request.end();
}

/**
 * HTTP GET request.  Send a query command to the Solr server (query)
 * 
 * @param {Object} params
 * @param {String} params.host - IP address or host address of the Solr server
 * @param {Number|String} params.port - port of the Solr server
 * @param {String} params.core - name of the Solr core requested
 * @param {String} params.authorization - value of the authorization header
 * @param {String} params.fullPath - full path of the request, contains query parameters
 * @param {Function} callback(err,obj) - a function executed when the Solr server responds or an error occurs
 * @param {Error} callback().err
 * @param {Object} callback().obj - JSON response sent by the Solr server deserialized
 * 
 * @api private
 */

var queryRequest = function(params,callback){
   var options = {
      host : params.host,
      port : params.port,
      path : params.fullPath
   };
   
   if(params.authorization){ 
      var headers = {
         'authorization' : params.authorization
      };
      options.headers = headers;
   }
   
   var callbackResponse = function(res){
      var buffer = '';
      var err = null;
      res.on('data',function(chunk){
         buffer += chunk;
      });
      
      res.on('end',function(){
         if(res.statusCode !== 200){
            err = new SolrError(res.statusCode,buffer);
            if (callback)  callback(err,null);
         }else{
            try{
               var data = JSON.parse(buffer);
            }catch(error){
               err = error;
            }finally{
               if (callback)  callback(err,data);
            }
         }
      });
   }
   
   var request = http.get(options,callbackResponse);
   
   request.on('error',function(err){ 
      if (callback) callback(err,null);
   });
}
