import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./pages/router.tsx";
import "./sass/sass.css";
import { AuthCtxProvider } from "./store/auth.context.tsx";
import { ShopDataProvider } from "./store/shop/shop-data.context.tsx";
import ReactToastsContainer from "./components/toasts/ReactToastsContainer.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ReactToastsContainer />
		<AuthCtxProvider>
			<ShopDataProvider>
				<Router />
			</ShopDataProvider>
		</AuthCtxProvider>
	</React.StrictMode>
);
