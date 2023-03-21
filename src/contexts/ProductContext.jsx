import axios from "axios";
import React, { createContext, useState } from "react";
import { API } from "../utils/consts";

export const productContext = createContext();

function ProductContext({ children }) {
	const [products, setProducts] = useState([]);
	const [oneProduct, setOneProduct] = useState(null);

	async function getProducts() {
		try {
			const { data } = await axios.get(API);
			setProducts(data);
		} catch (e) {
			console.log(e);
		}
	}

	async function addProduct(newProduct) {
		try {
			await axios.post(API, newProduct);
			getProducts();
		} catch (e) {
			console.log(e);
		}
	}

	async function deleteProduct(id) {
		await axios.delete(`${API}/${id}`);
		getProducts();
	}

	async function getOneProduct(id) {
		const { data } = await axios.get(`${API}/${id}`);
		setOneProduct(data);
	}

	async function editProduct(id, prodEdit) {
		await axios.patch(`${API}/${id}`, prodEdit);
		getProducts();
	}

	const values = {
		products: products,
		oneProduct: oneProduct,
		getProducts: getProducts,
		addProduct: addProduct,
		deleteProduct: deleteProduct,
		getOneProduct: getOneProduct,
		editProduct: editProduct,
	};
	return (
		<productContext.Provider value={values}>{children}</productContext.Provider>
	);
}

export default ProductContext;
