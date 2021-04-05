module.exports = function(app, passport) {

  async function updateUserInfo (req, res) {
		let user = await User.findById(req.params.id);
	user.name = req.body.name;
	user.username = req.body.username;
	user.email = req.body.email;
		console.log(JSON.stringify(user));
	user.save();
	}
	
	
	
}