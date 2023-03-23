import axios from "axios";
import React, { createContext, useReducer, useState } from "react";
import { ACTIONS, API } from "../utils/consts";

export const productContext = createContext();

const initialState = {
	products: [],
	oneProduct: null,
};

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.products:
			return { ...state, products: action.payload };
		case ACTIONS.oneProduct:
			return { ...state, oneProduct: action.payload };
		default:
			return state;
	}
}

function ProductContext({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	// const [products, setProducts] = useState([]);
	// const [oneProduct, setOneProduct] = useState(null);

	async function getProducts() {
		try {
			const { data } = await axios.get(API);
			// setProducts(data);
			dispatch({
				type: ACTIONS.products,
				payload: data,
			});
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
		// setOneProduct(data);
		dispatch({
			type: ACTIONS.oneProduct,
			payload: data
		})
	}

	async function editProduct(id, prodEdit) {
		await axios.patch(`${API}/${id}`, prodEdit);
		getProducts();
	}

	const values = {
		products: state.products,
		oneProduct: state.oneProduct,
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
