
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";
import "./i18n";
import "./styles/index.css";
import "./mobile-optimizations.css";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
