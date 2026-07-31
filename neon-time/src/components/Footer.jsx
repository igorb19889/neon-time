import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6"; // iTicket
import { SiTiktok } from "react-icons/si";   // TikTok
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>Neon Time</h3>
          <p><strong>Moldova, Chișinău</strong></p>
          <strong>Telefon:</strong>{" "}
          <span>
            <a href="tel:+37367430043" className="contact-link">
              +373 67 43 00 43
            </a>
          </span>
          <p><strong>Program de Lucru:</strong> Luni - Duminica, 09:00 - 21:00</p>
        </div>

        <div className="footer-right">
          <a href="https://www.facebook.com/neontimeproject" className="social-btn facebook" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/neontimeproject/" className="social-btn instagram" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/@neontime7595" className="social-btn youtube" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="https://iticket.md/event/neon-time-party" className="social-btn iticket" aria-label="iTicket">
            <FaTicket />
          </a>
          <a href="https://www.tiktok.com/@teatrul_radical" className="social-btn tiktok" aria-label="TikTok">
            <SiTiktok />
          </a>
        </div>
      </div>
    </footer>
  );
}
