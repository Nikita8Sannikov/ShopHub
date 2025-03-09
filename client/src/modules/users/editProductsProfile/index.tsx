import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { RootState } from "../../../store";
import { updateProducts } from "@/store/reducers/cart/cartSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/header";

import "./edit.css";

// const EditProfile = () => {
const EditProductsProfile = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.auth.user)

	const [form, setForm] = useState({
		title: "",
		category: "",
		description: "",
		price: "",
		rating: "",
		image: "",
	});

	const changeHandler = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	useEffect(() => {
		const fetchGoods = async () => {
			const response = await fetch(`/api/goods/${id}`);
			const data = await response.json();
			setForm({
				title: data.ftitle,
				category: data.category,
				description: data.description,
				price: data.price,
				rating: data.role,
				image: data.image,
			});
		};
		fetchGoods();
	}, [id]);

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		const response = await fetch(`/api/goods/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});

		const data = await response.json();
		console.log(data);

		if (response.ok) {
			updateProducts(data);
			navigate(`/products/${id}`); 
		} else {
			alert("Ошибка при сохранении данных");
		}
	};

	const callbacks = {
		onBack: useCallback(() => {
			navigate(`/products/${id}`);
		}, [navigate]),
	};

	return (
		<div className="edit-container">
			<Header onBack={callbacks.onBack} />

			<form className="mt-[150px]">
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
							value={form.price}
							onChange={changeHandler}
							placeholder="Цена"
						/>

						<Input
							type="text"
							name="rating"
							placeholder="Рейтинг"
							value={form.rating}
							onChange={changeHandler}
						/>
						<Input
							type="text"
							name="image"
							placeholder="Фото товара"
							value={form.image}
							onChange={changeHandler}
						/>
					</>
				)}

				<Button onClick={handleSave}>Сохранить</Button>
			</form>
		</div>
	);
};

export default EditProductsProfile;
