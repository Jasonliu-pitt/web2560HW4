var express = require('express');
var router = express.Router();

// Models
var user = require('../models/User.js');


//get all

router.route('/').get(function (req, res) {
	user.find(function (err, users) {
    if (err) res.send(err);
        res.json(users);
    });
});

//get by id

router.route('/:user_id').get(function (req, res) {
    user.findById(req.params.user_id, function (err, users) {
		if (err) res.send(err);
		res.json(users);
    });
});

//get by username
router.route('/findname/:username').get(function (req, res) {
    user.find({name:req.params.username}, function (err, users) {
		if (err) res.send(err);
		res.json(users);
    });
});

//update by id

router.route('/:user_id').post(function (req, res) {
	user.findById(req.params.user_id, function (err, doc) {
	if (err) throw err;
    doc.name = req.body.name;
    doc.password = req.body.password;
	doc.email = req.body.email;
    doc.tel = req.body.tel;
    doc.save(function (err) {
			if (err) res.send(err);
			res.send({ Failed: false, data: doc })
		});
    });
});

//delete by id

router.route('/:user_id').delete(function (req, res) {

    user.deleteOne({ _id: req.params.user_id }, function (err, users) {
        if (err) res.send(err);
        res.json({ Failed: false, message: 'Successfully deleted !' });
    })

});

// Return router
module.exports = router;
