import { Schema, model } from "mongoose";

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    guestId: {type: String, deafault: null},
    goodsId: { type: Schema.Types.ObjectId, ref: "Goods", required: true },
    amount: { type: Number, required: true }
});

export default model("User", schema);
