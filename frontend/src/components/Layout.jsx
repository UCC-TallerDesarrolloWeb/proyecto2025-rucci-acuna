import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={`layout ${isHome ? "layout--home" : ""}`}>
      {!isHome && <Header />}
      <main id="main">
        <Outlet />
      </main>
      {!isHome && <Footer />}
    </div>
  );
};

export default Layout;

