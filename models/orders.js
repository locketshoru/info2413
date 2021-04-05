const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	status: {
		type: String,
		required: true
	},
	/* orderTotal: {
		type: Number,
		required: true
	}, hey I'm trying to work something give sec -Slingsby' np :)*/
	customer: {
		type: String,
		required: true
	},
	item1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Inventory',
		required: true
	},
	item1Title: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item1Image: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item1Description: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item1Price: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item1Quantity: {
		type: String,
		required: true
	},
	item2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Inventory',
		required: true
	},
	item2Title: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item2Image: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item2Description: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item2Price: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item2Quantity: {
		type: String,
		required: true
	},
	item3: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Inventory',
		required: true
	},
	item3Title: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item3Image: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item3Description: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item3Price: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item3Quantity: {
		type: String,
		required: true
	},
	item4: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Inventory',
		required: true
	},
	item4Title: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item4Image: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item4Description: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item4Price: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item4Quantity: {
		type: String,
		required: true
	},
	item5: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Inventory',
		required: true
	},
	item5Title: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item5Image: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item5Description: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item5Price: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item5Quantity: {
		type: String,
		required: true
	},
	cashier: {
		type: String,
		required: true
	}
	
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
