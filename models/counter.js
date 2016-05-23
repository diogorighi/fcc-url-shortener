var mongoose = require( 'mongoose' );

var counterSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	value: { type: Number, default: 0 }
});

mongoose.model('Counter', counterSchema);
