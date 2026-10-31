import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const googleMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Rush%20Concordia";

export default function Reviews() {
  return (
    <section className="review-invite" id="resenas" aria-labelledby="reviews-title">
      <div className="review-invite-copy">
        <p className="eyebrow">Reseñas</p>
        <h2 id="reviews-title">¿Ya nos visitaste?</h2>
        <p>
          Encuentra Rush Concordia en Google Maps para consultar opiniones y
          compartir tu experiencia.
        </p>
        <a
          className="btn btn-gold"
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Buscar Rush Concordia en Google Maps"
        >
          Ver reseñas en Maps
          <FaArrowUpRightFromSquare aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}