import { useEffect, useState } from "react";
import slide1 from "../assets/rush-concordia-01.jpeg";
import slide2 from "../assets/rush-concordia-02.jpeg";
import slide3 from "../assets/rush-concordia-03.jpeg";
import slide4 from "../assets/rush-concordia-04.jpeg";

const slides = [
  {
    src: slide1,
    alt: "Afiche Rush de Peach Cold Brew, bebida de temporada",
    title: "Peach Cold Brew",
  },
  {
    src: slide2,
    alt: "Afiche Rush de Banana Latte, bebida de temporada",
    title: "Banana Latte",
  },
  {
    src: slide3,
    alt: "Afiche Rush de Latte de Calabaza Especiada, bebida de temporada",
    title: "Latte de Calabaza Especiada",
  },
  {
    src: slide4,
    alt: "Afiche con las tres bebidas de temporada de Rush",
    title: "Bebidas de temporada",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [paused]);

  const goTo = (next) => {
    setIndex((next + slides.length) % slides.length);
  };

  return (
    <section className="hero" id="inicio" aria-label="Rush Concordia">
      <div className="hero-copy">
        <p className="eyebrow">Café para cambiar el ritmo</p>
        <h1>Elige tu próxima pausa.</h1>
        <p className="hero-description">
          Descubre las bebidas de temporada y encuentra un nuevo favorito en
          Rush Concordia.
        </p>
        <a className="btn btn-gold" href="#coleccion">
          Ver bebidas
        </a>
      </div>
      <div
        className="carousel"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <div className="carousel-track">
          {slides.map((slide, i) => {
            return (
              <article
                key={slide.title}
                className={`slide${i === index ? " is-active" : ""}`}
                aria-hidden={i !== index}
              >
                <img src={slide.src} alt={slide.alt} />
              </article>
            );
          })}
        </div>

        <button
          className="carousel-btn prev"
          type="button"
          aria-label="Anterior"
          onClick={() => goTo(index - 1)}
        >
          ‹
        </button>
        <button
          className="carousel-btn next"
          type="button"
          aria-label="Siguiente"
          onClick={() => goTo(index + 1)}
        >
          ›
        </button>

        <div className="dots" role="tablist" aria-label="Diapositivas">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              className={i === index ? "is-active" : ""}
              aria-label={`Ir a la diapositiva ${i + 1}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
