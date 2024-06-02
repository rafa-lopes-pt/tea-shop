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
					element={
						<>
							<h1>Cart</h1>
						</>
					}
				/>
				<Route
					path="account"
					element={
						<SectionWrapper className="">
							<h1>Account</h1>
						</SectionWrapper>
					}
				/>
				<Route
					path="login"
					element={<AuthPage />}
				/>
			</Route>
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
