import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import AddProductPage from "../pages/AddProductPage";
import EditProductPage from "../pages/EditProductPage";
import ReducerExamplePage from "../pages/ReducerExamplePage";

function MainRoutes() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/add" element={<AddProductPage />} />
				<Route path="/edit/:id" element={<EditProductPage />} />
			</Route>
			<Route path="*" element={<NotFoundPage />} />
			
			<Route path="/reducer" element={<ReducerExamplePage />} />
		</Routes>
	);
}

export default MainRoutes;
