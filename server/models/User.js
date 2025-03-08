import { Schema, model } from "mongoose";

const schema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	isAdmin: { type: Boolean, default: false },
	// goods: [{ type: Schema.Types.ObjectId, ref: "Goods" }],
});

export default model("User", schema);
