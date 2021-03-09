//File Purpose: total inventory schema setup for MongoDB.

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/item', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.catch(error => console.log(error.message));

var itemSchema = new mongoose.Schema({
	title: String,
	image: String,
	description: String,	
	price: String
});

module.exports = mongoose.model("Item", itemSchema);

