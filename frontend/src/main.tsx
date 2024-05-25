import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./pages/router.tsx";
import "./sass/sass.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>
);
