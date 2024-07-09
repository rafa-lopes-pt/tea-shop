import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromChildren,
} from "react-router-dom";
import App from "./App";
import AuthPage from "./auth/AuthPage";
import SectionWrapper from "./misc/SectionWrapper";
import ShopPage from "./shop/ShopPage";
import ItemDisplay from "./item/ItemDisplay";
import AccountPage from "./account/AccountPage";
import CartPage from "./cart/CartPage";
import AccountActivation from "./auth/AccountActivation";

const router = createBrowserRouter(
	createRoutesFromChildren(
		<>
			<Route
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
				path="/activate/:token/"
				element={<AccountActivation />}
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
