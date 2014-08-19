var should = require('should');
var getTitleFromUrl = require('../index');

describe('getTitleFromUrl', function() {
	it('should get baidu title', function(done) {
		getTitleFromUrl('http://www.baidu.com/',function(err,title){
		   if(err){
		   	 done(err);
		   }	
		   title.should.equal("百度一下，你就知道");
		   done();
		});
	});
	it('should get baidu title with promise', function(done) {
      getTitleFromUrl('http://www.baidu.com/')
      .then(function(title) {
        title.should.equal("百度一下，你就知道");       
      }).then(function(){
      	done();
      },function(err){
      	done(err);
      });
    });
    it('should get baidu and 36kr title', function(done) {
		getTitleFromUrl(['http://www.baidu.com/','http://www.36kr.com'],function(err,title){
		   if(err){
		   	 done(err);
		   }			
		    title[0].should.equal("百度一下，你就知道");
			title[1].should.equal("36氪 | 关注互联网创业");   
			done();  
		})
	});
	it('should get baidu and 36kr title with promise', function(done) {
      getTitleFromUrl(['http://www.baidu.com/','http://www.36kr.com'])
      .then(function(title) {
        title[0].should.equal("百度一下，你就知道");
        title[1].should.equal("36氪 | 关注互联网创业");      
      }).then(function(){
      	done();
      },function(err){
      	done(err);
      });
    });
});
