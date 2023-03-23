import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { newProductContext } from "../contexts/NewProductContext";

function EditProductPage() {
	const { editProduct, getOneProduct, oneProduct } =
		useContext(newProductContext);
	const { id } = useParams();
	const navigate = useNavigate();
	const [formValue, setFormValue] = useState({
		title: "",
		price: "",
		description: "",
		image: "",
	});

	useEffect(() => {
		getOneProduct(id);
	}, []);

	useEffect(() => {
		if (oneProduct) {
			setFormValue(oneProduct);
		}
	}, [oneProduct]);

	function handleChange(e) {
		const obj = {
			...formValue,
			[e.target.name]: e.target.value,
		};
		setFormValue(obj);
	}

	function handleSubmit(e) {
		e.preventDefault();

		editProduct(id, formValue);
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
