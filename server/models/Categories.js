import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default model("Category", schema);
