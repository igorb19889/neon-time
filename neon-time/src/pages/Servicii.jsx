import React, { useState } from "react"; 
import "./servicii.css";

export default function Servicii() {
  const [openIndex, setOpenIndex] = useState(null);

  const faq = [
    {
      question: "Pot aduce mâncarea mea?",
      answer: "Da, părinții pot aduce gustările preferate pentru copii.",
    },
    {
      question: "Câte persoane pot participa?",
      answer: "Sala este pentru 10 copii și părinții lor, dar putem adăuga locuri suplimentare.",
    },
    {
      question: "Este inclusă muzica și DJ-ul?",
      answer: "Da, DJ-ul nostru profesionist se ocupă de muzică, karaoke și animație muzicală.",
    },
    {
      question: "Pot personaliza decorul?",
      answer: "Desigur! Decorurile neon și activitățile pot fi personalizate după dorință.",
    },
  ];

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="services-page">
      {/* <img className="img-servicii" src="./images/servicii.jpg" alt="image" /> */}
      {/* Intro */}
      <section className="services-intro">
        <h2>🎉 Petreceri Neon Time</h2>
        <p>
          Specificul petrecerilor <b>Neon Time</b> este lumea culorilor fluorescente
          și o atmosferă de club adevărat!  
          O sală de <b>180 mp</b>, exclusiv pentru petrecerea dvs, decoruri glow in the dark,
          baloane și accesorii strălucitoare!  
          O echipă profesionistă – DJ, Moderator și Pictor Facepainting – este la dispoziția copiilor
          pe tot parcursul petrecerii.
        </p>
      </section>

      {/* Prețuri */}
      <section className="services-prices">
        <h3>💰 Prețuri</h3>
        <div className="price-cards">
          <div className="price-card">
            <span className="card-icon">🎉</span>
            <h4>Pachet Standard include:</h4>
            <p>10 copii La pretul de 5500 lei</p>
            <p>Durata: 3 ore</p>
          </div>

          <div className="price-card">
            <span className="card-icon">👦</span>
            <h4>Loc Suplimentar:</h4>
            <p>Pentru fiecare copil adaugator: +350 lei</p>
          </div>
        </div>
      </section>

      {/* Opțiuni Extra */}
      <section className="services-options">
        <h3>✨ Opțiuni Extra</h3>
        <div className="option-cards">
          <div className="option-card">🎊 Piniata Fluorescentă – 1000 lei
            <p><strong>Bomboanele pentru piniata le aduc părinții.</strong></p>
            </div>
          <div className="option-card">📸 Servicii Foto – 1500 lei</div>
        </div>
      </section>

      {/* Activități */}
      <section className="services-activities">
        <h3>🎭 Activitățile noastre</h3>
        <div className="activity-cards">
          <div className="activity-card">
            <h4>🎨 Facepainting & Pictură</h4>
            <p>Pictură pe față, corp și haine cu vopsele fluorescente + planșe de colorat neon.</p>
          </div>
          <div className="activity-card">
            <h4>🎧 DJ Party</h4>
            <p>Sistem audio 2000W, Just Dance, karaoke, lumini, fum, lasere și bule de săpun.</p>
          </div>
          <div className="activity-card">
            <h4>🕺 Moderator</h4>
            <p>Actor profesionist cu jocuri, dansuri, challenge-uri și recuzită fluorescentă.</p>
          </div>
          <div className="activity-card">
            <h4>🎂 Deservirea Tortului</h4>
            <p>Moment special cu muzică, felicitări și fotografii la panoul decorativ.</p>
          </div>
          <div className="activity-card">
            <h4>🍽️ Masa de Sărbătoare</h4>
            <p>Gustări aduse de părinți, spațiu comod și tacâmuri incluse.</p>
          </div>
        </div>
      </section>

      {/* Bonus */}
      <section className="services-bonus">
        <h3>🎁 Bonusuri Speciale</h3>
        <p>🎀 Brățară neon pentru fiecare invitat</p>
        <p>💌 Felicitare neon personalizată pentru omagiat</p>
      </section>

      {/* FAQ */}
      <section className="services-faq">
        <h3>❓ Întrebări frecvente</h3>
        {faq.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <h4>{item.question}</h4>
            {openIndex === index && <p>{item.answer}</p>}
          </div>
        ))}
      </section>

      {/* CTA */}
      {/* <section className="services-cta">
        <h3>📩 Rezervă acum!</h3>
        <p>Contactează-ne și transformă petrecerea copilului tău într-o experiență neon memorabilă!</p>
        <a href="/rezervare" className="cta-button">Rezervă acum</a>
      </section> */}
    </div>
  );
}
