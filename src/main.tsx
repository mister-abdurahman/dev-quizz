import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QuizzProviderContext } from "./contexts/quizzContext";
import "tailwindcss/tailwind.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QuizzProviderContext>
      <App />
    </QuizzProviderContext>
  </React.StrictMode>
);
