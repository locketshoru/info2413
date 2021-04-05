const { MongoClient } = require('mongodb');

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    const uri = "mongodb+srv://administrator:test1234@info-2413.md3gl.mongodb.net/TestDB?retryWrites=true&w=majority";
    
    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await printCheapestSuburbs(client);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

// Add functions that make DB calls here
async function printCheapestSuburbs(client) {
    const pipeline = [
        {
            '$group': {
              '_id': '$cashier', 
              'ordernum': {
                '$sum': 1
              }
            }
          }
            
    ];

    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#aggregate for the aggregate() docs
    const aggCursor = client.db("testDB").collection("orders").aggregate(pipeline);

    await aggCursor.forEach(orders=> {
        console.log(`${orders._id}: ${orders.ordernum}`);
    });
}