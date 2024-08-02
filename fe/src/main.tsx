import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/style.scss";
import "./global.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { StyleProvider } from "@ant-design/cssinjs";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <StyleProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </StyleProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
