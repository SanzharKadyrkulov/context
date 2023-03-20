import React, { createContext, useState } from "react";

export const productContext = createContext();

function ProductContext({ children }) {
	const [products, setProducts] = useState([]);

	const values = {
		products: products,
	};
	return (
		<productContext.Provider value={values}>{children}</productContext.Provider>
	);
}

export default ProductContext;
