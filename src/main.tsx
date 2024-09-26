import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthedUserProvider } from "./components/AuthedUserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthedUserProvider>
        <App />
      </AuthedUserProvider>
    </BrowserRouter>
  </StrictMode>
);
