import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { RootState } from "../../../store";
import { updateProducts } from "@/store/reducers/cart/cartSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/header";

import "./edit.css";

interface IForm {
	title: string;
    category: string;
    description: string;
    price: string;
    rating: string;
    image: File | null;
}

const EditProductsProfile = () => {
	//получаем id продукта
	const { id } = useParams();
	const navigate = useNavigate();
	//получаем юзера чтобы проверить админ ли он
	const user = useSelector((state: RootState) => state.auth.user)

	//создаем стейт
	const [form, setForm] = useState<IForm>({
		title: "",
		category: "",
		description: "",
		price: "",
		rating: "",
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

	//функция для получения продукта и заполнения полей при редактировании
	const fetchGoods = async () => {
		const response = await fetch(`/api/goods/${id}`);
		const data = await response.json();
		setForm({
			title: data.title || "",
			category: data.category || "",
			description: data.description || "",
			price: data.price || "",
			rating: data.rating || "",
			image: data.image || null,
		});
	};

	//вызываем fetchGoods при редактировании то есть когда существует id чтобы
	//поля заполнились текущими значениями
	useEffect(() => {
		if(id){
			fetchGoods();
		}
	}, [id]);

	//сохораняем продукт(при редакировании или создании)
	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
	
		formData.append("title", form.title);
		formData.append("category", form.category);
		formData.append("description", form.description);
		formData.append("price", form.price);
		formData.append("rating", form.rating);
		if (form.image) {
		  formData.append("image", form.image); // Добавляем изображение
		}

		const method = id ? "PATCH" : "POST"; 
		const url = id ? `/api/goods/${id}` : "/api/goods/create";

		const response = await fetch(url, {
			method,
			body: formData,
		});

		// const response = await fetch(`/api/goods/${id}`, {
		// 	method: "PATCH",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify(form),
		// });

		const data = await response.json();
		console.log(data);

		if (response.ok) {
			if(id) {
				updateProducts(data);
			} else { 
				/** Добавляем новый товар */
			}
			navigate(`/products/${data.id || id}`); 
		} else {
			alert("Ошибка при сохранении данных");
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
			<Header onBack={id ? callbacks.onEditBack : callbacks.onCreateBack} />

			<form className="mt-[150px]" onSubmit={handleSave}>
				{user?.isAdmin && (
					<>
						<Input type="text"
							name="title"
							placeholder="Имя товара"
							value={form.title}
							onChange={changeHandler}
						/>

						<Input type="text"
							name="category"
							placeholder="Категория"
							value={form.category}
							onChange={changeHandler}
						/>

						<Textarea
							name="description"
							placeholder="Описание"
							value={form.description}
							onChange={changeHandler}
						/>

						<Input type="text"
							name="price"
							placeholder="Цена"
							value={form.price}
							onChange={changeHandler}
						/>

						<Input type="text"
							name="rating"
							placeholder="Рейтинг"
							value={form.rating}
							onChange={changeHandler}
						/>
						<Input type="file"
							accept="image/*"
							onChange={handleFileChange} />
					</>
				)}

				<Button type="submit" onClick={handleSave}>{id ? "Сохранить изменения" : "Создать товар"}</Button>
			</form>
		</div>
	);
};

export default EditProductsProfile;
