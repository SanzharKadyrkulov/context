import React, { useContext, useEffect } from "react";
import { productContext } from "../contexts/ProductContext";
import ProductCard from "./ProductCard";
import { newProductContext } from "../contexts/NewProductContext";

function ProductsList() {
	// ! получаем данные из контекста
	const { products, getProducts } = useContext(newProductContext);

	//! стягиваем продукты из db.json
	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				flexWrap: "wrap",
				gap: "30px",
			}}
		>
			{/* // ! перебираем массив products и на каждый его элемент возвращаем компонент ProductCard */}
			{products.map((item) => {
				//! передаем элемент массива через пропс
				return <ProductCard key={item.id} item={item} />;
			})}
		</div>
	);
}

export default ProductsList;
