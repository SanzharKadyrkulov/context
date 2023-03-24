import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ProductContext from "./contexts/ProductContext";
import NewProductContext from "./contexts/NewProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	//! оборачиваем в BrowserRouter именно он дает возможность переходить по страницам
	<BrowserRouter>
		<ProductContext>
			<NewProductContext>
				<App />
			</NewProductContext>
		</ProductContext>
	</BrowserRouter>
);
