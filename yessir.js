const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
    {
      '$group': {
        '_id': '$cashier', 
        'ordernum': {
          '$sum': 1
        }
      }
    }
  ];
  
  MongoClient.connect(
    'mongodb+srv://administrator:test1234@info-2413.md3gl.mongodb.net/TestDB?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(connectErr, client) {
      assert.equal(null, connectErr);
      const coll = client.db('TestDB').collection('orders');
      newFunction(coll);    
      
      
      client.close();
    });
 

function newFunction(coll) {
  console.log(coll.aggregate(agg));
}
    