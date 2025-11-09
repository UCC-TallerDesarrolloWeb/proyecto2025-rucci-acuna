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
        <Route index element={<Home />} />              
        <Route path="destinos" element={<Destinos />} />
        <Route path="itinerario" element={<Itinerario />} />
        <Route path="contacto" element={<Contacto />} />
      </Route>
    </Routes>
  );
}

