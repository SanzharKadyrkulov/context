import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { newProductContext } from "../contexts/NewProductContext";

function EditProductPage() {
	//! получаем editProduct, getOneProduct, oneProduct из контекста
	const { editProduct, getOneProduct, oneProduct } =
		useContext(newProductContext);
	//! получаем id из адрессной строки (парамерты)
	//! вытаскиваем по ключу id потому что сами указали это в MainRoutes
	const { id } = useParams();
	//! useNavigate - это хук из react-router-dom чтобы переходить по страницам
	const navigate = useNavigate();

	//! состояние для данных из инпутов которые по умолчанию пустые
	const [formValue, setFormValue] = useState({
		title: "",
		price: "",
		description: "",
		image: "",
	});

	//! отправляем запрос на получение данных продукты который мы изменяем
	useEffect(() => {
		getOneProduct(id);
	}, []);

	//! следим за состоянием oneProduct и меняем formValue когда данные пришли чтобы подставить значение в инпуты
	useEffect(() => {
		if (oneProduct) {
			setFormValue(oneProduct);
		}
	}, [oneProduct]);

	//! функция которая при изменении инпута меняет соответсвующий ключ у состояния formValue
	function handleChange(e) {
		// ! копируем formValue во избежании потери старых данных
		// ! e.target.name - какой ключ меняем
		// ! e.target.value - на что меняем (значение из инпута)
		const obj = {
			...formValue,
			[e.target.name]: e.target.value,
		};
		setFormValue(obj);
	}

	//! функция для сохранения изменений
	function handleSubmit(e) {
		e.preventDefault();
		//! проверка на пустые поля
		if (
			!formValue.title.trim() ||
			!formValue.price.trim() ||
			!formValue.description.trim() ||
			!formValue.image.trim()
		) {
			alert("Заполните поля");
			return;
		}

		//! отправляем запрос на изменение данных продукта в db.json
		editProduct(id, formValue);
		//! возвращаемся на предыдущую страницу
		navigate(-1);
	}

	return (
		<Box
			component="form"
			onSubmit={(e) => handleSubmit(e)}
			sx={{
				"& > :not(style)": { m: 1, width: "25ch" },
			}}
			noValidate
			autoComplete="off"
		>
			<TextField
				onChange={(e) => handleChange(e)}
				value={formValue.title}
				name="title"
				label="Title"
				variant="outlined"
			/>
			<TextField
				onChange={(e) => handleChange(e)}
				value={formValue.description}
				name="description"
				label="Description"
				variant="outlined"
			/>
			<TextField
				onChange={(e) => handleChange(e)}
				value={formValue.price}
				name="price"
				label="Price"
				variant="outlined"
			/>
			<TextField
				onChange={(e) => handleChange(e)}
				value={formValue.image}
				name="image"
				label="Image"
				variant="outlined"
			/>
			<Button type="submit" variant="contained">
				Save
			</Button>
		</Box>
	);
}

export default EditProductPage;
