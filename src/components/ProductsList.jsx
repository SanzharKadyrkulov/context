import React, { useContext, useEffect } from "react";
import { productContext } from "../contexts/ProductContext";
import ProductCard from "./ProductCard";

function ProductsList() {
	const { products, getProducts } = useContext(productContext);

	useEffect(() => {
		getProducts();
	}, []);

	console.log(products);

	return (
		<div>
			{products.map((item) => {
				return <ProductCard key={item.id} item={item} />;
			})}
		</div>
	);
}

export default ProductsList;
