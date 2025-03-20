import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store";
import useRoutes from "../../hooks/useRoutes";
import { remind } from "../../store/reducers/auth/authSlice";
import Spinner from "../spinner";

function App() {
	const dispatch: AppDispatch = useDispatch();
	const status = useSelector((state: RootState) => state.auth.status);
	const router = useRoutes();

	useEffect(() => {
		dispatch(remind());
	}, [dispatch]);

	if (status === "loading") {
		return <Spinner />;
	}

	return (
		<BrowserRouter>
			{router}
		</BrowserRouter>
	);
}

export default App;
