import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { AppDispatch, RootState } from "../../../store";
import { createProduct, fetchGoodsById, updateProduct } from "@/store/reducers/goods/goodsSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/header";

interface IForm {
	title: string;
	category: string;
	description: string;
	price: number;
	rating: number;
	image: File | string | null;
}

const EditProductsProfile = () => {
	//получаем id продукта
	const { id } = useParams();
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	//получаем юзера чтобы проверить админ ли он
	const user = useSelector((state: RootState) => state.auth.user)

	//создаем стейт
	const [form, setForm] = useState<IForm>({
		title: "",
		category: "",
		description: "",
		price: 0,
		rating: 0,
		image: null
	});

	//функция которая изменяет стейт
	const changeHandler = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	//функция для добавления картинки
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		if (file) {
			setForm({ ...form, image: file });
		}
	};

	const handleFetchGoodId = async () => {
		try {
			const data = await dispatch(fetchGoodsById(id!)).unwrap()

			setForm({
				title: data.title || "",
				category: data.category || "",
				description: data.description || "",
				price: data.price || 0,
				rating: data.rating || 0,
				image: data.image || null,
			});
		} catch (error) {
			console.error("Failed to fetch goods:", error);
		}
	}

	//вызываем fetchGoods при редактировании то есть когда существует id чтобы
	//поля заполнились текущими значениями
	useEffect(() => {
		if (id) {
			handleFetchGoodId()
		}
	}, [id]);

	//сохораняем продукт(при редакировании или создании)
	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("title", form.title);
		formData.append("category", form.category);
		formData.append("description", form.description);
		formData.append("price", form.price.toString());
		formData.append("rating", form.rating.toString());
		if (form.image) {
			formData.append("image", form.image);
		}

		try{
			let result;

			if(id){
				formData.append("_id", id); 
				result = await dispatch(updateProduct(formData)).unwrap();
			}else{
				result = await dispatch(createProduct(formData)).unwrap();
			}

			navigate(`/products/${result._id}`);
		}catch(e){
			if(e instanceof Error){
				alert("Ошибка при сохранении данных" + e);
			}
		}
	};

	const callbacks = {
		onEditBack: () => {
			navigate(`/products/${id}`);
		},
		onCreateBack: () => {
			navigate(`/list`);
		},
	};

	return (
		<div className="edit-container">
			<Header showBack={true} onBack={id ? callbacks.onEditBack : callbacks.onCreateBack} />

			<form className="mt-[150px] p-8 shadow-[0_0px_15px_rgba(0,0,0,0.1)] max-w-lg" onSubmit={handleSave}>
				{user?.isAdmin && (
					<>
						<Input type="text"
							name="title"
							placeholder="Имя товара"
							value={form.title}
							onChange={changeHandler}
							className="mb-4"
						/>

						<Input type="text"
							name="category"
							placeholder="Категория"
							value={form.category}
							onChange={changeHandler}
							className="mb-4"
						/>

						<Textarea
							name="description"
							placeholder="Описание"
							value={form.description}
							onChange={changeHandler}
							className="mb-4"
						/>

						<Input type="text"
							name="price"
							placeholder="Цена"
							value={form.price}
							onChange={changeHandler}
							className="mb-4"
						/>

						<Input type="text"
							name="rating"
							placeholder="Рейтинг"
							value={form.rating}
							onChange={changeHandler}
							className="mb-4"
						/>
						<Input type="file"
							accept="image/*"
							onChange={handleFileChange}
							className="mb-4"
						/>
					</>
				)}

				<Button type="submit" onClick={handleSave}>{id ? "Сохранить изменения" : "Создать товар"}</Button>
			</form>
		</div>
	);
};

export default EditProductsProfile;

