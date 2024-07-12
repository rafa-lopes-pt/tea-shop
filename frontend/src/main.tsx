import React from "react";
import ReactDOM from "react-dom/client";
import ReactToastsContainer from "./components/alerts/toasts/ReactToastsContainer.tsx";
import Router from "./pages/router.tsx";
import "./sass/sass.css";
import { AuthCtxProvider } from "./store/auth.context.tsx";
import { ShopDataCtxProvider } from "./store/shop-data.context.tsx";
import { CartCtxProvider } from "./store/cart.context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ReactToastsContainer />
		<AuthCtxProvider>
			<ShopDataCtxProvider>
				<CartCtxProvider>
					<Router />
				</CartCtxProvider>
			</ShopDataCtxProvider>
		</AuthCtxProvider>
	</React.StrictMode>
);
