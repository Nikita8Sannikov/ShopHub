import { Schema, model } from "mongoose";

const schema = new Schema({
	title: { type: String, required: true, unique: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	rating: { type: Number, required: true },
    image: { type: String, required: true }
});

export default model("Good", schema);
