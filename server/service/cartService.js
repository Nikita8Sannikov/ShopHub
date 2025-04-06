import UsersGoods from "../models/UsersGoods.js";
import Goods from "../models/Goods.js";

export const getCart = async () => {
    return await UsersGoods.find()
}

export const addToCart = async (userId, guestId, goodsId) => {
    const cartItem = await UsersGoods.findOne(
        userId ? { userId, goodsId } : { guestId, goodsId }
    );

    if (cartItem) {
        const error = new Error("Product already in cart");
        error.status = 400;
        throw error;
    }

    const newCartItem = await UsersGoods.create({ userId, guestId, goodsId, amount: 1 });

    const product = await Goods.findById(goodsId);

    if (!product) {
        const error = new Error("Product not found");
        error.status = 404;
        throw error;
    }

    return {
        _id: newCartItem._id,
        goodsId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        amount: newCartItem.amount
    };
}

export const patchCart = async (id, action) => {
    const cartItem = await UsersGoods.findById(id);

    if (!cartItem) {
        const error = new Error("Product not found");
        error.status = 404;
        throw error;
    }

    if (action === "increase") {
        cartItem.amount += 1;
    } else if (action === "decrease") {
        if (cartItem.amount > 1) {
            cartItem.amount -= 1;
        } else {
            await cartItem.deleteOne();
            return { message: "Product removed from cart" };
        }
    } else {
        const error = new Error("Invalid action");
        error.status = 400;
        throw error;
    }

    await cartItem.save();
    return cartItem;
}

export const deleteCartById = async (id) => {
    const cartItem = await UsersGoods.findByIdAndDelete(id);

    if (!cartItem) {
        const error = new Error("Product not found");
        error.status = 404;
        throw error;
    }
}