const MongoClient = require('mongodb').MongoClient
var testArray = [];

async function main() {

  const uri = 'mongodb+srv://administrator:test1234@info-2413.md3gl.mongodb.net/TestDB?retryWrites=true&w=majority';
	

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await printEmployeeOrderCount(client); // Prints out Employee's sales (refer to the function below as it will show the pipeline).
	await printTotalSales(client); // A grand total of all income for the month
	await printTotalSalesByEmployee(client); // Total income for each employee
	await printTotalOrdersProcessed(client); // Prints the total orders for the month
	await printTopFivePerformingEmployees(client); // Top five employees based on total sales for the month.
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function printEmployeeOrderCount(client) { // Function call, the bread and butter of the function please please please

  const pipeline = [
  {
    '$group': {
      '_id': '$cashier',
      'employeeOrderCount': {
        '$sum': 1
      }
    }
  }
] 
  // Make sure to build this part in MongoDB Atlas / MongoDB Compass or you might be struggling for a while. Instructions below VVVVVVV
  // 1. select the database > collection > aggregations tab
  // 2. play around with stages until you get the result you want
  // 3. export pipeline code to language > select NODE
  // 4. copy the code on the right > paste it in above pipeline const.

  const aggCursor = client.db("TestDB").collection("orders").aggregate(pipeline); // we need this so that we can find the database, collection, and the aggregate.

  await aggCursor.forEach( orders => {
      console.log(`${orders._id}: ${orders.employeeOrderCount}`); // output / result including the organization of the said output / result.
  });

}


async function printTotalSales(client) {
	
	const pipeline = [
		  {
    '$group': {
      '_id': 'Order total', 
      'orderTotal': {
        '$sum': '$orderTotal'
      }
    }
  }
]
  const aggCursor = client.db("TestDB").collection("orders").aggregate(pipeline); // we need this so that we can find the database, collection, and the aggregate.

  await aggCursor.forEach( orders => {
      console.log(`${orders._id}: ${orders.orderTotal}`); // output / result including the organization of the said output / result.
  });	
	
}

async function printTotalSalesByEmployee(client) {
	
	const pipeline = [
		{
			'$group': {
				'_id': '$cashier',
				'employeeSalesIndividual': {
					'$sum': '$orderTotal'
				}
			}
		}
	]
  const aggCursor = client.db("TestDB").collection("orders").aggregate(pipeline); // we need this so that we can find the database, collection, and the aggregate.

  await aggCursor.forEach( orders => {
      console.log(`${orders._id}: ${orders.employeeSalesIndividual}`); // output / result including the organization of the said output / result.
  });	
}

async function printTotalOrdersProcessed(client) {
	
	const pipeline = [
		{
			'$group': {
				'_id': 'Total orders for the month', 
				'totalOrdersProcessed': {
				'$sum': 1
				}
			}
  		}
	]
  const aggCursor = client.db("TestDB").collection("orders").aggregate(pipeline); // we need this so that we can find the database, collection, and the aggregate.

  await aggCursor.forEach( orders => {
      console.log(`${orders._id}: ${orders.totalOrdersProcessed}`); // output / result including the organization of the said output / result.
  });	
}

async function printTopFivePerformingEmployees(client) {
	
	const pipeline = [
  {
    '$group': {
      '_id': '$cashier', 
      'salesTotal': {
        '$sum': '$orderTotal'
      }
    }
  }, {
    '$sort': {
      'salesTotal': -1
    }
  }, {
    '$limit': 5
  }
]
	
  const aggCursor = client.db("TestDB").collection("orders").aggregate(pipeline); // we need this so that we can find the database, collection, and the aggregate.

  await aggCursor.forEach( orders => {
      console.log(`${orders._id}: ${orders.salesTotal}`); // output / result including the organization of the said output / result.
  });
}