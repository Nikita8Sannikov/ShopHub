import { Schema, model } from "mongoose";

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    goodsId: { type: Schema.Types.ObjectId, ref: "Goods", required: true },
});

export default model("User", schema);
