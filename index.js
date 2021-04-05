
const mongo = require('./mongo');
const MongoClient = require('mongodb').MongoClient;
//const newLocal = db.collection('orders');

const connectToMongoDB = async() => {
    await mongo().then((mongoose) => {
    try {
        console.log('Conncted to MongoDb!')
    }finally{
        mongoose.connection.close()
    }
})
}

connectToMongoDB()


client.db('TestDB').collection('orders')([
    {
        '$group': {
          '_id': '$cashier', 
          'ordernum': {
            '$sum': 1
          }
        }
      }
])