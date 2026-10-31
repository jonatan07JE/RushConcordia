export default function Header({ isMenu = false }) {
  const homeUrl = import.meta.env.BASE_URL;
  const menuUrl = `${homeUrl}menu`;

  return (
    <header className="nav">
      <a
        className="brand"
        href={isMenu ? homeUrl : "#inicio"}
        aria-label="Rush Concordia, inicio"
      >
        <span>Rush Concordia</span>
      </a>
      <nav className="nav-links" aria-label="Principal">
        {isMenu ? (
          <>
            <a href={homeUrl}>Inicio</a>
            <a href={`${homeUrl}#historia`}>Historia</a>
            <a href={`${homeUrl}#resenas`}>Reseñas</a>
            <a href={`${homeUrl}#redes`}>Redes</a>
          </>
        ) : (
          <>
            <a href="#coleccion">Bebidas</a>
            <a href="#historia">Historia</a>
            <a href="#resenas">Reseñas</a>
            <a href="#redes">Redes</a>
          </>
        )}
      </nav>
      <a className="btn btn-gold" href={isMenu ? homeUrl : menuUrl}>
        {isMenu ? "Inicio" : "Ver menú"}
      </a>
    </header>
  );
}
