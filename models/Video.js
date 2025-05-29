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
	courseId:
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

export default mongoose.model('Video', videoSchema);
