import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./router.tsx";
import { Provider } from "./components/Provider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider>
			<Router />
		</Provider>
	</StrictMode>,
);
