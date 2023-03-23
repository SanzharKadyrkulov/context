import React, { createContext, useReducer } from "react";
import { ACTIONS, API } from "../utils/consts";
import axios from "axios";

// ! создаем контекст
// ! экспортируем чтобы использовать в других файлах
export const newProductContext = createContext();

// ! начадьное состояние
const initState = {
	products: [],
	oneProduct: null,
};

// ! функция reducer которое оптсывает как должно меняться состояние
function reducer(state, action) {
	// ! свич кейс который проверяет action.type и меняет соответствующее состояние
	switch (action.type) {
		// ! выносим ACTIONS в отдельную константу во избежании ошибок
		// ! описываем кейсы для изменения каждого состояния
		case ACTIONS.products:
			return { ...state, products: action.payload };
		case ACTIONS.oneProduct:
			return { ...state, oneProduct: action.payload };
		default:
			// ! по дефолту всегда возвращаем стейт
			return state;
	}
}

function NewProductContext({ children }) {
	//! создаем состояние с useReducer'ом
	const [state, dispatch] = useReducer(reducer, initState);

	// ! фукция чтобы получить данныу с сервера
	async function getProducts() {
		const { data } = await axios.get(API);
		// ! чтобы поменять состояние products
		dispatch({
			type: ACTIONS.products,
			payload: data,
		});
	}

	// ! функция чтобы получить данные одного объекта с сервера
	async function getOneProduct(id) {
		const { data } = await axios.get(`${API}/${id}`);

		// ! чтобы поменять состояние oneProduct
		dispatch({
			type: ACTIONS.oneProduct,
			payload: data,
		});
	}

	// ! функция для добавления в db.json
	async function addProduct(newProd) {
		await axios.post(API, newProd);
		// ! стягиваем актуальные данные после добавления
		getProducts();
	}

	// ! функция для удаления из db.json
	async function deleteProduct(id) {
		await axios.delete(`${API}/${id}`);
		// ! стягиваем актуальные данные после удаления
		getProducts();
	}

	// ! функция для изменения одного объекта из db.json
	async function editProduct(id, prodEdit) {
		await axios.patch(`${API}/${id}`, prodEdit);
		// ! стягиваем актуальные данные после изменения
		getProducts();
	}

	//! данные которые мы передаем всем дочерним компонентам
	const value = {
		products: state.products,
		oneProduct: state.oneProduct,
		getProducts,
		getOneProduct,
		addProduct,
		deleteProduct,
		editProduct,
	};

	// ! возвращаем context.Provider который оборачивает children
	// ! именно он передает данные которые мы передали в атрибут value
	return (
		<newProductContext.Provider value={value}>
			{children}
		</newProductContext.Provider>
	);
}

export default NewProductContext;
