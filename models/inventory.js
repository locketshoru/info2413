//File Purpose: total inventory schema setup for MongoDB.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Commenting out to fallback on
mongoose.connect('mongodb://localhost:27017/item', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.catch(error => console.log(error.message));
*/

const inventorySchema = new Schema({
	title: {
		type: String,
		required: true
	},
	image: {
		type: String, // Not sure of the datatype for this yet
		required: true
	},
	description: {
		type: String,
	},
	price: {
		type: String,
		required: true
	}
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;

