import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  { label: "WhatsApp", href: "https://wa.me/529381604041", icon: FaWhatsapp },
  { label: "Instagram", href: "https://www.instagram.com/rushcafeconcordia?vrfl=ZDNlZDc0MzIxNw==", icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com/rushcafeconcordia", icon: FaFacebookF }
];

export default function Footer() {
  return (
    <footer className="footer" id="redes">
      <div className="social-block">
        <p className="eyebrow">Síguenos</p>
        <nav className="social-links" aria-label="Redes sociales">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              title={label}
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </nav>
        <a className="footer-phone" href="mailto:rushcafeconcordia@gmail.com">
          rushcafeconcordia@gmail.com
        </a>
      </div>
      <div className="footer-meta">
        <span>© 2026 Rush Concordia. Todos los derechos reservados.</span>
        <span>Café para cada momento.</span>
      </div>
    </footer>
  );
}
