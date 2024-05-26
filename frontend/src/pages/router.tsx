import {
	Route,
	RouterProvider,
	Routes,
	createBrowserRouter,
	createRoutesFromChildren,
} from "react-router-dom";
import App from "./App";
import ShopPage from "./shop/ShopPage";
import SectionWrapper from "./misc/SectionWrapper";

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
					element={
						<>
							<h1>item</h1>
						</>
					}
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
					path="signup"
					element={
						<>
							<h1>SignUp</h1>
						</>
					}
				/>
				<Route
					path="login"
					element={
						<>
							<h1>Login</h1>
						</>
					}
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
