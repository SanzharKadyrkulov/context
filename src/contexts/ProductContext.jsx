import axios from "axios";
import React, { createContext, useState } from "react";
import { API } from "../utils/consts";

export const productContext = createContext();

function ProductContext({ children }) {
	const [products, setProducts] = useState([]);

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

	const values = {
		products: products,
		getProducts: getProducts,
		addProduct: addProduct,
		deleteProduct: deleteProduct,
	};
	return (
		<productContext.Provider value={values}>{children}</productContext.Provider>
	);
}

export default ProductContext;
