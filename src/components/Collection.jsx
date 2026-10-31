import { formatPrice } from "../drinks.js";
import { useDrinks } from "../drinkStore.js";

export default function Collection() {
  const { drinks, error } = useDrinks();

  return (
    <section className="intro" id="coleccion">
      <p className="eyebrow">La carta de temporada</p>
      <h2>Un nuevo sabor para cada pausa.</h2>
      <p className="lead">
        Seis bebidas para disfrutar la temporada. Encuentra tu favorita y elige
        cómo quieres hacer tu pausa.
      </p>
      <div className="drinks-grid">
        {drinks.slice(0, 6).map((drink) => (
          <article className="drink-card" key={`${drink.id}-${drink.name}`}>
            <img
              src={drink.image}
              alt={drink.alt}
              decoding="async"
            />
            <div className="drink-card-copy">
              <p className="drink-type">{drink.type}</p>
              <h3>{drink.name}</h3>
              <p>{drink.description}</p>
              <div className="drink-price-row">
                <span>Precio sugerido</span>
                <strong>MXN {formatPrice(drink.price)}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
      {error && <p className="menu-load-error" role="alert">{error}</p>}
      <a className="btn btn-outline menu-preview-link" href={`${import.meta.env.BASE_URL}menu`}>
        Ver menú completo
      </a>
      <p className="menu-note collection-price-note">
        Precios sugeridos; consulta el precio final en tienda.
      </p>
    </section>
  );
}
