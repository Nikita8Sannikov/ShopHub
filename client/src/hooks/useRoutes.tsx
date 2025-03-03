import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Main from "../modules/users";
import ProductLayout from "@/modules/users/productLayout";
// import EditProfile from "../modules/users/editProfile";

const useRoutes = () => {
	return useMemo(
		() => (
			<Routes>
				<Route path="/list" element={<Main />} />
				<Route path="/products/:id" element={<ProductLayout />} />
				<Route path="*" element={<Navigate to="/list" />} />
			</Routes>
		),
		[]
	);
};

export default useRoutes;
