//File Purpose: accounts schema setup for MongoDB.

const mongoose = require('mongoose'),
	Schema       = mongoose.Schema,
	bcrypt       = require('bcrypt');

const userSchema = new Schema({
	role:	{
		type: String, //role permissions: user, employee, admin
		required: true},	
	username:	{
		type: String,
		required: true},	
	password:	{
		type: String,
		required: true},	
	name:	{
		type: String,
		required: true},	
	email:	{
		type: String,
		required: true},	
	shipaddr:	{
		type: String,
		required: false	},	
	avatar:	{
		type: String,
		required: false	},
	
});


// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {	
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('Users', userSchema);