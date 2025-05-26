import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  	title: 
	{ 
		type: String, 
		required: true 
	},
	filename: 
	{ 
		type: String, 
		required: true 
	},
	uploadedAt: 
	{ 
		type: Date, 
		default: Date.now 
	}
});

module.exports = mongoose.model('Video', videoSchema);
