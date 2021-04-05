var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb+srv://administrator:test1234@info-2413.md3gl.mongodb.net/TestDB?retryWrites=true&w=majority';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  simplePipeline(db, function() {
    db.close();
  });
});

var simplePipeline = function(db, callback) {
  var collection = db(TestDB).collection( 'orders' );
  collection.aggregate( 
      [ 	
          {
        '$group': {
          '_id': '$cashier', 
          'ordernum': {
            '$sum': 1
          }
        }
      }
      ],	  
	  function(err, results) {
        assert.equal(err, null);

        console.log(results)
        callback(results);
      }
  );
}