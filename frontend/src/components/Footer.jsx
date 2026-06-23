const Footer = () => {
  const anio = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>&copy; {anio} BRÚJULA - Agencia de viajes</p>
      </div>
    </footer>
  );
};

export default Footer;
