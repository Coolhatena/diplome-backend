import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
	title: 
	{ 
		type: String, 
		required: true 
	},
	description: 
	{ 
		type: String, 
		required: true 
	},
	imageUrl: 
	{
		type: String, 
		required: true 
	},
	lessons: {
		type: [mongoose.Schema.Types.Mixed],
	},
	userId:
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

export default mongoose.model('Course', courseSchema);
