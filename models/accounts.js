//File Purpose: accounts schema setup for MongoDB.

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/account', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.catch(error => console.log(error.message));

var accountSchema = new mongoose.Schema({
	username: String,
	type: String, //role permissions: user, employee, admin
	password: String, //figure it out
	email: String, //figure this out too
	avatar: String //a link will be fine we don't have to host it
});

module.exports = mongoose.model("Account", accountSchema);

