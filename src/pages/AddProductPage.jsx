import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { productContext } from "../contexts/ProductContext";
import { newProductContext } from "../contexts/NewProductContext";

function AddProductPage() {
	//! получаем функцию addProduct из контекста
	const { addProduct } = useContext(newProductContext);
	//! состояние для данных из инпутов которые по умолчанию пустые
	const [formValue, setFormValue] = useState({
		title: "",
		price: "",
		description: "",
		image: "",
	});

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

	//! функция для добавления
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
		//! добавляем данные из формы на db.json
		addProduct(formValue);
		//! очищаем инпуты
		setFormValue({
			title: "",
			price: "",
			description: "",
			image: "",
		});
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
				Add
			</Button>
		</Box>
	);
}

export default AddProductPage;
