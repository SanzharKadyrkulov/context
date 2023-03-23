import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { productContext } from "../contexts/ProductContext";
import { newProductContext } from "../contexts/NewProductContext";

function AddProductPage() {
	const { addProduct } = useContext(newProductContext);
	const [formValue, setFormValue] = useState({
		title: "",
		price: "",
		description: "",
		image: "",
	});

	function handleChange(e) {
		const obj = {
			...formValue,
			[e.target.name]: e.target.value,
		};
		setFormValue(obj);
	}

	function handleSubmit(e) {
		e.preventDefault();

		addProduct(formValue);
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
