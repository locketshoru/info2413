//File Purpose: accounts schema setup for MongoDB.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Commenting out to fallback on
/*
mongoose.connect('mongodb://localhost:27017/account', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.catch(error => console.log(error.message));
*/
/*
{"username":"Ted Flanders","role":"user","password":"","email":"fake@email.com","avatar":""}
{"username":"Harold Spork","role":"user","password":"","email":"yetAnotherFake@email.com","avatar":""}
{"username":"Freddy Van Gough","role":"user","password":"","email":"anotherFake@email.com","avatar":""}
*/
const accountsSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	role: {
		type: String, //role permissions: user, employee, admin
		required: true
	},
	password: {
		type: String, //figure it out
		required: true
	},
	email: {
		type: String, //figure this out too
		required: true
	},
	avatar: {
		type: String, //a link will be fine we don't have to host it
		required: true
	},
});

const Accounts = mongoose.model('Accounts', accountsSchema);
module.exports = Accounts;

