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
/*
{"title":"Lint Roller","image":"https://drive.google.com/file/d/1I3GC0UDOhsgMpblLKwF8OTL1-VPgUHB5/view?usp=sharing","ItemDescription":"Get that lint off your furniture and clothing!","ItemPrice":6.99}
{"title":"Digital Scale","image":"https://drive.google.com/file/d/1IHhlOhG0ifVk1YI0VPGiqFgJkJnUcHYV/view?usp=sharing","ItemDescription":"For weighing your vegetables and other produce.","ItemPrice":24.99}
{"title":"White Noise Machine","image":"https://drive.google.com/file/d/1eU1u2-i_kpHpYgXqQNlopv99ascE_ENv/view?usp=sharing","ItemDescription":"Put yourself to sleep by palette clensing your ears.","ItemPrice":10.99}
{"title":"Modern Alarm Clock","image":"https://drive.google.com/file/d/11113TRCk21qH3VfKa1sLc7obHhp_U9mN/view?usp=sharing","ItemDescription":"Wake up to the ringing of the past with a modern-day alarm clock!","ItemPrice":24.99}
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

