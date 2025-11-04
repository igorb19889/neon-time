import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTicketAlt } from 'react-icons/fa';
import { SiTiktok } from "react-icons/si";   // TikTok
import emailjs from "@emailjs/browser";
import { FaTicket } from "react-icons/fa6"; 
import './Contact.css';
// import ReservationForm from "../components/ReservationForm";

export default function Contact() {
  return (
    <section className="contact">
      <h2>📍 Contact</h2>

      <div className="contact-info">
       
        <div className="contact-details">
          <p>
            <strong>📍 Adresă:</strong> Chișinău, Moldova, str: Alecu Russo 20
          </p>
          <p>
            <strong>📞 Telefon:</strong>{' '}
            <a href="tel:+37367430043" className="contact-link">
              +373 67 43 00 43
            </a>
          </p>
          <p>
            <strong>✉️ Email:</strong>{' '}
            <a
              href="mailto:neontimeproject@gmail.com?subject=Solicitare%20informații%20Neon%20Time&body=Bună%20ziua%2C%20aș%20dori%20să%20aflu%20mai%20multe%20detalii%20despre%20serviciile%20Neon%20Time.%20Vă%20mulțumesc!"
              className="contact-link"
            >
              neontimeproject@gmail.com
            </a>
          </p>
          <p>
            <strong>🕒 Program:</strong> Luni - Duminica, 09:00 - 21:00
          </p>

         
          <div className="contact-socials">
            <a href="https://www.facebook.com/neontimeproject"   className="social-btn facebook"  aria-label="Facebook"> <FaFacebook /> </a>
            <a href="https://www.instagram.com/neontimeproject/" className="social-btn instagram" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.youtube.com/@neontime7595"      className="social-btn youtube"   aria-label="YouTube">  <FaYoutube />  </a>
            <a href="https://iticket.md/event/neon-time-party"   className="social-btn iticket"   aria-label="iTicket">  <FaTicketAlt /></a>
            <a href="https://www.tiktok.com/@teatrul_radical"    className="social-btn tiktok"    aria-label="TikTok">   <SiTiktok />   </a>
          </div>
        </div>

        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.2773706291396!2d28.882747321211923!3d47.03980490906615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97dea6164a27f%3A0xd037f9b1f0318d1b!2sNeon%20Time!5e0!3m2!1sfr!2s!4v1758287518581!5m2!1sfr!2s"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Harta Neon Time"
          ></iframe>
        </div>
      </div>

      {/* <ReservationForm /> */}
    </section>
  );
}
