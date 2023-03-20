import React, { useContext } from "react";
import { productContext } from "../contexts/ProductContext";

function ProductsList() {
	const res = useContext(productContext);
	console.log(res);
	return <div>ProductsList</div>;
}

export default ProductsList;
