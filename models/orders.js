const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
	/*_id: mongoose.Schema.Types.ObjectId,
	status: {
		type: String,
		required: true
	}, */
	orderTotal: {
		type: Number,
		required: false
	},
	customer: {
		type: String,
		required: true
	},
	item1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Inventory',
		required: false
	},
	item1Title: {
		type: String,
		ref: 'Inventory',
		required: true
	},
	item1Image: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item1Description: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item1Price: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item1Quantity: {
		type: String,
		required: true
	},
	item2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Inventory',
		required: false
	},
	item2Title: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item2Image: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item2Description: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item2Price: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item2Quantity: {
		type: String,
		required: false
	},
	item3: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Inventory',
		required: false
	},
	item3Title: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item3Image: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item3Description: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item3Price: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item3Quantity: {
		type: String,
		required: false
	},
	item4: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Inventory',
		required: false
	},
	item4Title: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item4Image: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item4Description: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item4Price: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item4Quantity: {
		type: String,
		required: false
	},
	item5: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Inventory',
		required: false
	},
	item5Title: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item5Image: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item5Description: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item5Price: {
		type: String,
		ref: 'Inventory',
		required: false
	},
	item5Quantity: {
		type: String,
		required: false
	},
	cashier: {
		type: String,
		required: false
	}
	
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
