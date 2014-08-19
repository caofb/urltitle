var request=require('request'),
    Q=require('q'),
    jsdom = require("jsdom"),
    fs=require('fs');
var jquery = fs.readFileSync(__dirname+"/node_modules/jquery/dist/jquery.js", "utf-8");
function crawlUrl(url) {
	var deferred = Q.defer();
	var options={
		url:url,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36'
		}
	}
	request(options,function(error, response, body){
           if(error) {
              deferred.reject(error);
           }
           else deferred.resolve(body);
    });
    return deferred.promise;
}
function getTitleFromBody(body){
	var deferred = Q.defer();
    jsdom.env({
    	html:body,
    	src:[jquery],
    	done:function (error, window) {
      	 if(error) {
              deferred.reject(error);
         }
         else {
         	var title=window.$("title").text();
         	if(title)
         	  deferred.resolve(title);
            else{
            	throw new Error('not find title');
            }
         };
        }
    });
    return deferred.promise;
}
function getTitleUrl(url){
	return crawlUrl(url).then(getTitleFromBody);
}
module.exports = function getTitleFromUrl(urls, callback) {
  var promise;

  if('string' === typeof urls) {
    promise = getTitleUrl(urls);
  } else {
    promise = Q.all(urls.map(function(url){return getTitleUrl(url)}));
  }
  if(!callback) {
    return promise;
  }

  promise.then(function(result) {
    callback(null, result);
  }, function(err) {
    callback(err);
  }).done();
}