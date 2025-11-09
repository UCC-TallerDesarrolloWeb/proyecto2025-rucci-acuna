
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>&copy; <span id="anio">{year}</span> BRÚJULA - Agencia de viajes</p>
      </div>
    </footer>
  );
};

export default Footer;
