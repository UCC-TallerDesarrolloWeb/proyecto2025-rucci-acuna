import {outlet} from 'react-router-dom';
import Header from './header.jsx';
import Footer from './footer.jsx';

const Layout = () => {
    return (
        <>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
        </>
    );
}
export default Layout;