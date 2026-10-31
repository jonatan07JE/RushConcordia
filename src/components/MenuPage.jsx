import { useEffect } from "react";
import { formatPrice } from "../drinks.js";
import { useDrinks } from "../drinkStore.js";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function MenuPage() {
  const { drinks, error } = useDrinks();

  useEffect(() => {
    document.title = "Menú — Rush Concordia";
    return () => {
      document.title = "Rush Concordia — Café para cambiar el ritmo";
    };
  }, []);

  return (
    <>
      <Header isMenu />
      <main className="menu-page">
        <div className="menu-heading">
          <p className="eyebrow">Rush Concordia · Temporada</p>
          <h1 id="menu-title">Nuestro menú</h1>
          <p>
            Descubre las bebidas de temporada y elige tu próxima pausa.
          </p>
        </div>
        <section className="drinks-grid menu-drinks-grid" aria-labelledby="menu-title">
          {drinks.map((drink) => (
            <article className="drink-card" key={`${drink.id}-${drink.name}`}>
              <img src={drink.image} alt={drink.alt} decoding="async" />
              <div className="drink-card-copy">
                <p className="drink-type">{drink.type}</p>
                <h2>{drink.name}</h2>
                <p>{drink.description}</p>
                <div className="drink-price-row">
                  <span>Precio sugerido</span>
                  <strong>MXN {formatPrice(drink.price)}</strong>
                </div>
              </div>
            </article>
          ))}
        </section>
        {error && <p className="menu-load-error" role="alert">{error}</p>}
        <p className="menu-note">
          Precios sugeridos en moneda mexicana; consulta el precio final y la
          disponibilidad en tienda.
        </p>
      </main>
      <Footer />
    </>
  );
}