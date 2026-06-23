import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";

/* Estructura compartida por las páginas internas. */
const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
