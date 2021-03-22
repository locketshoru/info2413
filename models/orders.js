//File Purpose: orders schema setup for MongoDB.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Commenting out to fallback on
mongoose.connect('mongodb://localhost:27017/order', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.catch(error => console.log(error.message));
*/

/*
{"OrderStatus":"Pending","customer":"customerID","itemList":"ItemID","cashier":"Employee1"}
{"OrderStatus":"Pending","customer":"customerID","itemList":"ItemID","cashier":"Employee2"}
{"OrderStatus":"Pending","customer":"customerID","itemList":"ItemID","cashier":"Employee2"}
{"OrderStatus":"Pending","customer":"customerID","itemList":"ItemID","cashier":"Employee3"}
*/
const orderSchema = new Schema({ //someone else can figure out how to add items to this
	status: {
		type: String,
		required: true
	},
		
	customer: {
		type: String,
		required: true
	},
	itemList: {
		type: String, //only lets you have one but this is someone else's problem :p
		required: true
	},
	cashier: {
		type: String,
		required: true
	}
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

