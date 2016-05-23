var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Url = mongoose.model('Url');

function retornaJSONDoc (res, doc) {
	res.json({
		url: doc.url,
		short: doc.shortened
	})
}

router.get('/', function(req, res){
	res.render('index');
});

router.get('/new/*', function(req, res) {
	var url = req.params[0] || "";

	url = url.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);

	if(url !== null) {
		url = url[0];
	} else {
		return res.json({
			error: "Invalid URL"
		})
	}

	Url.findOne({ url: url }, function(err, doc){
		if(doc) { 
			retornaJSONDoc(res, doc) 
		} else {

			var newUrl = new Url({
				url: url
			});
			newUrl.save(function(err, doc) {
				if (err) { console.log(err) }
				retornaJSONDoc(res, doc);
			})

		}
	})
});

router.get('/:short', function(req, res) {
	var url = req.params.short;

	Url.findOne({ shortened: url }, function(err, doc){
		if(err) console.log(err);

		if(doc){
			res.redirect(doc.url);	
		} else {
			res.json({
				error: "Shortened URL doesn't exist!"
			})
		}
		
	})

});

module.exports = router;
