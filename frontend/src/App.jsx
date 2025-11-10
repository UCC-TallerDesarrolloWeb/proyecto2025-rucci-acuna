/**
 * Componente principal de enrutamiento del proyecto BRÚJULA.
 * ---------------------------------------------------------
 * Define las rutas principales del sitio y aplica el Layout general
 * que contiene el Header, Footer y el <Outlet> de React Router.
 */

import { Routes, Route } from "react-router-dom";
import Layout from "@components/Layout";
import Home from "@pages/Home";
import Destinos from "@pages/Destinos";
import Itinerario from "@pages/Itinerario";
import Contacto from "@pages/Contacto";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Ruta principal (Home) */}
        <Route path="/" element={<Home />} />              
        {/* Otras secciones */}
        <Route path="destinos" element={<Destinos />} />
        <Route path="itinerario" element={<Itinerario />} />
        <Route path="contacto" element={<Contacto />} />
      </Route>
    </Routes>
  );
}
