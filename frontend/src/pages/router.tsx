import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromChildren,
} from "react-router-dom";
import App from "./App";
import AccountPage from "./account/AccountPage";
import ActivationPage from "./auth/ActivationPage";
import AuthPage from "./auth/AuthPage";
import CartPage from "./cart/CartPage";
import ActivateAccountErrors from "./errorBoundaries/ActivateAccountErrors";
import GenericErrorBoundary from "./errorBoundaries/GenericError";
import ItemDisplay from "./item/ItemDisplay";
import ShopPage from "./shop/ShopPage";

const router = createBrowserRouter(
	createRoutesFromChildren(
		<>
			<Route
				errorElement={<GenericErrorBoundary />}
				path="/"
				element={<App />}>
				<Route
					index
					element={<ShopPage />}
				/>
				<Route
					path="item/:id"
					element={<ItemDisplay />}
				/>
				<Route
					path="cart"
					element={<CartPage />
					}
				/>
				<Route
					path="account/:tab?"
					element={<AccountPage />}
				/>
				<Route
					path="login"
					element={<AuthPage />}
				/>

			</Route>
			<Route
				errorElement={<ActivateAccountErrors />}
				path="/activate/:token/"
				element={<ActivationPage />}
			/>
			{/* // */}
			<Route
				path="*"
				element={
					<>
						<h1>404</h1>
					</>
				}
			/>
		</>
	)
);

export default function Router() {
	return <RouterProvider router={router} />;
}
