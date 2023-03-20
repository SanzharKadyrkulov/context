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

	const values = {
		products: products,
		getProducts: getProducts,
	};
	return (
		<productContext.Provider value={values}>{children}</productContext.Provider>
	);
}

export default ProductContext;
