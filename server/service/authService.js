import UserGoods from "../models/UsersGoods.js";

async function guestCartToUserCart(userId, guestId, res) {

    if (!guestId) return;

    // Получаем товары гостя
    const guestCartItems = await UserGoods.find({ guestId });

    for (const item of guestCartItems) {
        // Проверяем, есть ли уже такой товар у пользователя
        const existingItem = await UserGoods.findOne({ userId, goodsId: item.goodsId });

        if (existingItem) {
            // Если товар уже есть, обновляем количество
            await UserGoods.updateOne(
                { _id: existingItem._id },
                { $inc: { amount: item.amount } }
            );

            // Удаляем дублирующийся товар гостя
            await UserGoods.deleteOne({ _id: item._id });
        } else {
            // Если товара нет у пользователя, просто привязываем его к userId
            await UserGoods.updateOne(
                { _id: item._id },
                { $set: { userId, guestId: null } }
            );
        }
    }

    res.clearCookie("xcid", { path: "/" }); // Удаляем guestId из куков
}

export default guestCartToUserCart;