/**
 * Punto de entrada principal del proyecto BRÚJULA.
 * Renderiza el componente App dentro de <HashRouter> para habilitar la navegación.
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; 
import App from "./App.jsx";
import "@styles/index.scss"; 
import "./utils/funcionalidades.js";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
