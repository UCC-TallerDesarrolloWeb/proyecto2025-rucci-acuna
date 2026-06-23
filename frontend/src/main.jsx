import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import ItinerarioProvider from "@components/ItinerarioContext";
import Layout from "@components/Layout";
import Home from "@pages/Home";
import Destinos from "@pages/Destinos";
import Itinerario from "@pages/Itinerario";
import Contacto from "@pages/Contacto";
import "@styles/index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ItinerarioProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="destinos" element={<Destinos />} />
            <Route path="itinerario" element={<Itinerario />} />
            <Route path="contacto" element={<Contacto />} />
          </Route>
        </Routes>
      </HashRouter>
    </ItinerarioProvider>
  </StrictMode>
);
