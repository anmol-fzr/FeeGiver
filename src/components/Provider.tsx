import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster, ThemeProvider } from "@/components";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SkeletonTheme } from "react-loading-skeleton";
import { CmdK } from "./custom/CmdK";

import "@/index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { envs } from "@/utils/envs";

type Props = {
	children: ReactNode;
};

const queryClient = new QueryClient();

const Provider = ({ children }: Props) => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider defaultTheme="dark" storageKey="fee-giver-ui-theme">
					<Toaster />
					<BrowserRouter>
						<SkeletonTheme baseColor="#1e293b" highlightColor="#111827">
							{children}
							<CmdK />
						</SkeletonTheme>
					</BrowserRouter>
					{envs.isDev && <ReactQueryDevtools />}
				</ThemeProvider>
			</QueryClientProvider>
		</>
	);
};

export { Provider };
