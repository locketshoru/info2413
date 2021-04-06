  	var Order       = require("../models/orders.js"),
		rolePermissions = require('./rolepermissions'),
		bodyParser      = require('body-parser'),
		Inventory       = require("../models/inventories.js"),
		User            = require("../models/users.js");

async function updateUserInfo (req, res) { //Accessible from /account and /eacc
	let user = await User.findById(req.params.id);
		if (req.body.name != '') {
			user.name = req.body.name;
		}
		if (req.body.username != '') {
			user.username = req.body.username;
		}
		if (req.body.email != '') {
			user.email = req.body.email;
		}
	user.save();
	res.render("index.ejs", {user:req.user,isLogged:rolePermissions.isLoggedIn});
	}; //modifying user

async function updateUserAvatar (req, res) { //Accessible from /account and /eacc
	let user = await User.findById(req.params.id);
		if (req.body.email != '') {
			user.email = req.body.email;
		}
	user.save();
	res.render("index.ejs", {user:req.user,isLogged:rolePermissions.isLoggedIn});
	}; //modifying user


	async function updateOrderInfo (input) { //Accessible from /obrowse
		let order = await Order.findById(input.id); //this would be a for loop if I had time
			if (input.customer != '') {
				order.customer = input.customer;
					console.log(input.customer);
			}
			if (input.item1Title != '' && input.item1Quantity != '') {
				order.item1Title = input.item1Title;
				order.item1Quantity = input.item1Quantity;
			}			
			if (input.item2Title != '' && input.item2Quantity != '') {
				order.item2Title = input.item2Title;
				order.item2Quantity = input.item2Quantity;
			}
			if (input.item3Title != '' && input.item3Quantity != '') {
				order.item3Title = input.item3Title;
				order.item3Quantity = input.item3Quantity;
			}
			if (input.item4Title != '' && input.item4Quantity != '') {
				order.item4Title = input.item4Title;
				order.item4Quantity = input.item4Quantity;
			}
			if (input.item5Title != '' && input.item5Quantity != '') {
				order.item5Title = input.item5Title;
				order.item5Quantity = input.item5Quantity;
			}
		order.status = 'New';
		order.save();
	}

	
	async function updateOrderStatus (req, res) { //Accessible from /obrowse
		let order = await Order.findById(req.params.id);
			if (order.status == 'New') {
				order.status = 'Working on';
			} else if (order.status = 'Working on') {
				order.status = 'Partially done';
			} else if (order.status = 'Partially done') {
				order.status = 'Completed';
			}
		order.save();
	}
	
	async function deleteOrder (req, res) { //Accessible from /overview
		let delorder = await Order.findById(req.params.id);
		if(order.status != 'New'){
				next(new Error("Permission denied."));
				return;
			} else {
				console.log("Deleting " + req.params.id);
				Order.deleteOne(delorder, function(err, obj) {
					if (err) throw err;
					console.log("Deletion successful.");
					res.render("index.ejs", {user:req.user,isLogged:rolePermissions.isLoggedIn});
				});
			}
	}
	
	async function newOrder (input) { //Accessible from /obrowse.
		var newOrder = {}; //this would be a for loop if I had time
		newOrder.status = 'New';
		if (input.customer != 'None') {
			newOrder.customer = input.customer;
		}
		if (input.item1Title != 'None' && input.item1Quantity != '') {
			newOrder.item1Title = input.item1Title;
			newOrder.item1Quantity = input.item1Quantity;
			Inventory.find({title: newOrder.item1Title}, function (err, result) {result = result[0];
				if (err){console.log(err);}	else {
					newOrder.item1Image = result.image;
					newOrder.item1Description = result.description;
					newOrder.item1Price = (result.price * newOrder.item1Quantity);
					
						if (input.item2Title != 'None' && input.item2Quantity != '') {
							newOrder.item2Title = input.item2Title;
							newOrder.item2Quantity = input.item2Quantity;
							Inventory.find({title: newOrder.item2Title}, function (err, resulttwo) {resulttwo = resulttwo[0];
								if (err){console.log(err);}	else {
									newOrder.item2Image = resulttwo.image;
									newOrder.item2Description = resulttwo.description;
									newOrder.item2Price = (resulttwo.price * newOrder.item2Quantity);
									
										if (input.item3Title != 'None' && input.item3Quantity != '') {
											newOrder.item3Title = input.item3Title;
											newOrder.item3Quantity = input.item3Quantity;
											Inventory.find({title: newOrder.item3Title}, function (err, resultthree) {resultthree = resultthree[0];
												if (err){console.log(err);}	else {
													newOrder.item3Image = resultthree.image;
													newOrder.item3Description = resultthree.description;
													newOrder.item3Price = (resultthree.price * newOrder.item3Quantity);
													
														if (input.item4Title != 'None' && input.item4Quantity != '') {
															newOrder.item4Title = input.item4Title;
															newOrder.item4Quantity = input.item4Quantity;
															Inventory.find({title: newOrder.item4Title}, function (err, resultfour) {resultfour = resultfour[0];
																if (err){console.log(err);}	else {
																	newOrder.item4Image = resultfour.image;
																	newOrder.item4Description = resultfour.description;
																	newOrder.item4Price = (resultfour.price * newOrder.item4Quantity);
																	newOrder.orderTotal = ( newOrder.item1Price + newOrder.item2Price + newOrder.item3Price + newOrder.item4Price );
						Order.create(newOrder, function(err, res) {
							if (err) throw err;
						console.log("New order successful.");
							});
																	}})};
													}})};
									}})};
					}})};
	}
	
module.exports.updateUserInfo = updateUserInfo;
module.exports.updateUserAvatar = updateUserAvatar;
module.exports.updateOrderInfo = updateOrderInfo;
module.exports.updateOrderStatus = updateOrderStatus;
module.exports.deleteOrder = deleteOrder;
module.exports.newOrder = newOrder;