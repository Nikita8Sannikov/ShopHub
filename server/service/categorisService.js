import Categories from "../models/Categories.js";

export const getCategories = async () => {
    return await Categories.find();
}

export const createCategory = async (name) => {
    const category = new Categories({
        name
    });

    return await category.save();
};

export const deleteCategoryById = async (id) => {
    return await Categories.findByIdAndDelete(id);
};