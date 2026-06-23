import { Outlet, useLocation } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";

/* En la página de inicio no se muestran el header ni el footer (es pantalla completa). */
const Layout = () => {
  const location = useLocation();
  const esHome = location.pathname === "/";

  return (
    <div className="layout">
      {!esHome && <Header />}
      <main id="main">
        <Outlet />
      </main>
      {!esHome && <Footer />}
    </div>
  );
};

export default Layout;
