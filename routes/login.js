var express = require('express');
var router = express.Router();

// Models
var user = require('../models/User.js');

router.route('/').post(function (req, res) {
	user.findOne({ name: req.body.name }, function (err, doc) {
		if (err) throw err;
		if (!doc) {
          res.json({ Failed: true, message: 'username not found' });
        } else {
            if (doc.password != req.body.password) {
                res.json({ Failed: true, message: 'username and password donot match ' });
            } else {
				res.json({ Failed: false, user: doc });
            }

        }

    });
});
module.exports = router;