import React from "react";
import './despre.css';
// import EmojiParticles from "./EmojiParticles";

export default function Despre() {
  return (
    <div className="despre-page">
      {/* <div className="despre-noi"> */}
      {/* <h1>Despre Noi</h1> */}
      {/* </div> */}
      
      {/* Secțiunea Titlu */}
      {/* <h2>🎭 Explorați Lumea Fluorescentă</h2>
      <h3>în lumini Black Lights la Neon Time Party!</h3> */}
  <img className="img-despre" src="./images/despre.jpg" alt="image" />

<section className="poveste-container">
  <div className="poveste-text">
    <h2>Povestea noastră</h2>
    <p>
      Neon Time este locul unde copilăria prinde viață în culori aprinse și zâmbete. 🌈  
      Am pornit cu dorința de a crea amintiri de neuitat pentru cei mici și pentru familiile lor.  
      Fiecare petrecere, fiecare decor și fiecare moment este gândit cu grijă, astfel încât bucuria să fie la ea acasă.  
      <br /><br />
      La Neon Time, credem că magia se ascunde în detalii: lumini colorate, jocuri interactive, personaje iubite și o atmosferă plină de veselie. ✨  
      Misiunea noastră este simplă — să transformăm zilele speciale în povești care se păstrează pentru totdeauna în inimile copiilor.
    </p>
  </div>

  <div className="poveste-img">
    <img src="./images/despre-neon.jpg" alt="Neon Time Evenimente" />
  </div>
</section>


{/* DESPRE-VALORI */}
<section className="despre-valori">
  <h2 className="valori-title">Valorile noastre</h2>

  {/* 1 */}
  <div className="valori-grid">
    <div className="valori-card">
      <div className="valori-icon">🎨</div>
      <h3>Creativitate</h3>
      <p>Fiecare copil devine artistul propriei petreceri prin activități interactive și colorate.</p>
    </div>

{/* 2 */}
    <div className="valori-card">
      <div className="valori-icon">💖</div>
      <h3>Bucurie</h3>
      <p>Cream momente pline de râsete, distracție și amintiri de neuitat pentru copii.</p>
    </div>

{/* 3 */}
    <div className="valori-card">
      <div className="valori-icon">✨</div>
      <h3>Magia Copilăriei</h3>
      <p>Transformăm fiecare eveniment într-o experiență unică și plină de culoare.</p>
    </div>

    {/* 4 */}
    <div className="valori-card">
      <div className="valori-icon">🎉</div>
      <h3>Distracție garantată</h3>
      <p>Evenimentele noastre sunt pline de energie, jocuri și surprize pentru toți copiii.</p>
    </div>

    {/* 5 */}

    <div className="valori-card">
      <div className="valori-icon">🎭</div>
      <h3>Show-uri și Magie</h3>
      <p>Spectacole interactive cu personaje colorate.</p>
    </div>

    {/* 6 */}

    <div className="valori-card">
      <div className="valori-icon">🌈</div>
      <h3>Amintiri de neuitat</h3>
      <p>Creăm momente speciale care rămân pentru totdeauna în inimile copiilor și părinților.</p>
    </div>
    
  </div>
</section>


{/* Secțiunea Echipa */}

    <section className="despre-echipa">
  <h2 className="echipa-title">Echipa noastră</h2>
  <div className="echipa-grid">

    {/* LIDA NOVICOV */}
    <div className="echipa-member">
      <img src="./images/echipa-noastra/lida.jpg" alt="image-lida" />
      <h3>Lida Novicov</h3>
      <p>Manager Petreceri 🎈</p>
    </div>

      {/* JENEA NOVICOV*/}
    <div className="echipa-member">
      <img src="/images/echipa-noastra/jenea.jpg" alt="image-jenea" />
      <h3>Eugen Novicov ✨</h3>
      <p>Coordonator Activități</p>
    </div>

      {/* DORIN GRIBINCEA */}
    <div className="echipa-member">
      <img src="/images/echipa-noastra/dorin.jpg" alt="image-dorin" />
      <h3>Dorin Gribincea</h3>
      <p>Artist Neon & Decor 🎈</p>
    </div>
  </div>


  {/* ////////////////////// */}

  {/* SERGIU NOVICOV */}
  <div className="echipa-grid">
    <div className="echipa-member">
      <img src="/images/echipa-noastra/sirioja.jpg" alt="image-sirioja" />
      <h3>Sergiu Novicov</h3>
      <p>Responsabil de Muzica  🎉</p>
    </div>


    {/* ELIZA BALINSCHII */}
    <div className="echipa-member">
      <img src="/images/echipa-noastra/eliza.jpg" alt="image-eliza" />
      <h3>Eliza Balinschii</h3>
      <p>Artist Neon & Decor 💚</p>
    </div>


    {/* IGOR BALINSCHII */}
    <div className="echipa-member">
      <img src="/images/echipa-noastra/igor.jpg" alt="image-igor" />
      <h3>Igor Balinschii</h3>
      <p>Coordonator Activități  🎉</p>
    </div>
  </div>
</section>


{/* ===== BUTON REZERVĂ =====
      <section id="reservation" className="home-reservation">
        <a href="/rezervare" className="hero-button">Rezervă-ți locul acum!</a>
      </section> */}

      
{/* <section className="services-cta">
        <h3>📩 Rezervă acum!</h3>
        <p>Contactează-ne și transformă petrecerea copilului tău într-o experiență neon memorabilă!</p>
        <a href="/rezervare" className="cta-button">Rezervă acum</a>
      </section> */}


    </div>
  );
}
