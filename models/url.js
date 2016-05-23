var mongoose = require('mongoose');
var Counter = mongoose.model("Counter");

var urlSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
		unique: true
	},
	shortened: {
		type: Number,
		requered: true,
		unique: true
	},
	createdAt: {
		type: Date,
		default: Date.now	
	}
});

urlSchema.pre('save', function(next){
	var doc = this;
	Counter.findByIdAndUpdate({ _id: "counter" }, { $inc: { value: 1 } }, function(err, counter){
		if(err) return next(err);
		doc.shortened = counter.value;
		next();
	});
});

mongoose.model("Url", urlSchema);
