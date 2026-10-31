export default function Header({ isMenu = false }) {
  return (
    <header className="nav">
      <a
        className="brand"
        href={isMenu ? "/" : "#inicio"}
        aria-label="Rush Concordia, inicio"
      >
        <span>Rush Concordia</span>
      </a>
      <nav className="nav-links" aria-label="Principal">
        {isMenu ? (
          <>
            <a href="/">Inicio</a>
            <a href="/#historia">Historia</a>
            <a href="/#resenas">Reseñas</a>
            <a href="/#redes">Redes</a>
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
      <a className="btn btn-gold" href={isMenu ? "/" : "/menu"}>
        {isMenu ? "Inicio" : "Ver menú"}
      </a>
    </header>
  );
}
