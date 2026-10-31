export default function Story() {
  return (
    <section className="story" id="historia">
      <div className="story-text">
        <p className="eyebrow">Rush Concordia</p>
        <h2>Tu pausa, a tu manera.</h2>
        <p>
          Desde un latte especiado hasta un cold brew frutal, aquí hay una bebida
          para acompañar cada momento. Ven por tu clásico o prueba algo nuevo.
        </p>
        <a className="btn btn-outline" href="#redes">
          Síguenos
        </a>
      </div>
      <div className="story-highlights" aria-label="Bebidas destacadas">
        <p><span>01</span> Latte de Calabaza Especiada</p>
        <p><span>02</span> Banana Latte</p>
        <p><span>03</span> Peach Cold Brew</p>
      </div>
    </section>
  );
}
