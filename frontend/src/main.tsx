import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./pages/router.tsx";
import "./sass/sass.css";
import { AuthCtxProvider } from "./store/auth.context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AuthCtxProvider>
			<Router />
		</AuthCtxProvider>
	</React.StrictMode>
);
