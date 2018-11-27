var express = require('express');
var router = express.Router();

// Models
var User = require('../models/User.js');

router.route('/').post(function (req, res) {
	User.findOne({ name: req.body.name }, function (err, doc) {
		if (err) throw err;
		if (doc) {
          res.json({ Failed: true, message: 'username '+ req.body.name + ' already exist!'});
        } else{
			user = new User({
				name: req.body.name,
				password: req.body.password,
				email: req.body.email,
				tel: req.body.tel
			});
			user.save();
			res.json({ Failed: false, message: 'User Created !' });
        }

    });
});

module.exports = router;