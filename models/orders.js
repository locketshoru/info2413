//File Purpose: orders schema setup for MongoDB.

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/order', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.catch(error => console.log(error.message));

var orderSchema = new mongoose.Schema({ //someone else can figure out how to add items to this
	status: String,
	customer: String,
	itemList: String, //only lets you have one but this is someone else's problem :p
	cashier: String
});

module.exports = mongoose.model("Order", orderSchema);

