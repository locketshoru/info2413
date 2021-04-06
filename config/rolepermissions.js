	// Role permission functions.
	
	function isLoggedIn(req, res, next) {
			if (req.isAuthenticated())
				return next();
			res.redirect('/login');
	}
	function requireAdmin(req, res, next) {
		if (req.user.role != 'admin') {
			next(new Error("Permission denied."));
			return;
		}
		next();
	}	
	function requireEmployee(req, res, next) {
		if (req.user.role != 'employee') {
			next(new Error("Permission denied."));
			return;
		}
		next();
	}
	function requirePaid(req, res, next) { //Must be either an employee or admin.
		if (req.user.role == (!'employee' && !'admin')) {
			next(new Error("Permission denied."));
			return;
		}
		next();
	}


module.exports.isLoggedIn = isLoggedIn;
module.exports.requirePaid = requirePaid;
module.exports.requireEmployee = requireEmployee;
module.exports.requireAdmin = requireAdmin;