import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster, ThemeProvider } from "@/components";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/index.css";

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
          <BrowserRouter>{children}</BrowserRouter>
          <ReactQueryDevtools />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export { Provider };
