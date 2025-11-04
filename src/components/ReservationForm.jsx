// ReservationForm.jsx
import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import DatePicker, { registerLocale } from "react-datepicker";
import ro from "date-fns/locale/ro";
import "react-datepicker/dist/react-datepicker.css";
import "./reservation.css";

// import axios from "axios";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

import { doc, setDoc } from "firebase/firestore";

registerLocale("ro", ro);

export default function ReservationForm() { 
  const form      = useRef();
  const statusRef = useRef(null);
  // La începutul componentului, adaugă un nou state pentru animație


  const [userName,        setUserName       ] = useState("")   ;
  const [userEmail,       setUserEmail      ] = useState("")   ;
  const [userPhone,       setUserPhone      ] = useState("")   ;
  const [selectedDate,    setSelectedDate   ] = useState(null) ;
  const [selectedTime,    setSelectedTime   ] = useState("")   ;
  const [childrenCount,   setChildrenCount  ] = useState(10)   ;
  const [piniataSelected, setPiniataSelected] = useState(false);
  const [fotoSelected,    setFotoSelected   ] = useState(false);
  const [payOnline,       setPayOnline      ] = useState(false);
  const [paymentAmount,   setPaymentAmount  ] = useState(null) ;
  const [status,          setStatus         ] = useState("")   ;
  const [bookedTimes,     setBookedTimes    ] = useState({})   ;
  const [userMessage,     setUserMessage    ] = useState("")   ;

  const [stripePaid,      setStripePaid     ] = useState(false); // ← adăugat pentru blocarea butonului
  const [showConfetti, setShowConfetti      ] = useState(false); // Pentru efect WAW

  // const hours = Array.from({ length: 13 }, (_, i) => 9 + i).map(
  //   (h) => `${h.toString().padStart(2, "0")}:00`
  // );

  
  const hours = Array.from({ length: 25 }, (_, i) => {
  const hour = Math.floor((9 * 60 + i * 30) / 60);
  const minute = (9 * 60 + i * 30) % 60;
  return `${String(hour).padStart(2, "0")}:${minute === 0 ? "00" : minute}`;
}).filter(time => {
  // Limitează la intervalul 09:00 - 21:00
  const [h] = time.split(":").map(Number);
  return h >= 9 && h <= 21;
});



  const formatDateKey = (date) => {
    if (!date) return "";
    const d     = new Date(date);
    const day   = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year  = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const basePrice          = 5500;
  const extraChildrenPrice = 350;
  const piniataPrice       = 1000;
  const fotoPrice          = 1500;
  const extraChildrenCount = childrenCount > 10 ? childrenCount - 10 : 0;
  const totalAmount        =
    basePrice +
    extraChildrenCount * extraChildrenPrice +
    (piniataSelected ? piniataPrice : 0) +
    (fotoSelected ? fotoPrice : 0);

  // Load reservations
  useEffect(() => {
  const unsub = onSnapshot(collection(db, "reservations"), (snapshot) => {
    const reservations = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      const key = data.date; // format dd/mm/yyyy

      if (!reservations[key]) reservations[key] = [];

      if (data.time && data.date) {
        let [h, m] = data.time.split(":").map(Number);
        const totalSlots = 7; // 3 ore + ultimul slot 30 min inclus

        for (let i = 0; i < totalSlots; i++) {
          let slotH = h + Math.floor((m + i * 30) / 60);
          let slotM = (m + i * 30) % 60;
          const slotStr = `${slotH.toString().padStart(2,"0")}:${slotM.toString().padStart(2,"0")}`;
          if (!reservations[key].includes(slotStr)) {
            reservations[key].push(slotStr);
          }
        }
      }
    });

    setBookedTimes(reservations);
  });

  return () => unsub();
}, []);

  // Check for successful payment from localStorage
 // Generare bookedTimes corect
useEffect(() => {
  const unsub = onSnapshot(collection(db, "reservations"), (snapshot) => {
    const reservations = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      const key = data.date;

      if (!reservations[key]) reservations[key] = [];

      if (data.time) {
        let [h, m] = data.time.split(":").map(Number);
        const totalSlots = 7; // 3 ore + ultimul slot 30 min

        for (let i = 0; i < totalSlots; i++) {
          let slotH = h + Math.floor((m + i * 30) / 60);
          let slotM = (m + i * 30) % 60;
          const slotStr = `${slotH.toString().padStart(2,"0")}:${slotM.toString().padStart(2,"0")}`;
          if (!reservations[key].includes(slotStr)) {
            reservations[key].push(slotStr); // doar sloturi DUPA ora rezervării
          }
        }
      }
    });

    setBookedTimes(reservations);
  });

  return () => unsub();
}, []);



// const getAvailableHours = () => {
//   if (!selectedDate) return hours.map(h => ({ hour: h, available: true }));

//   const key = formatDateKey(selectedDate);
//   const booked = bookedTimes[key] || [];

//   return hours.map(hour => {
//     const available = !booked.includes(hour);
//     return { hour, available, reason: available ? "" : "ocupat" };
//   });
// };


// === FUNCȚIE: generează exact 3 ore în față ===
const generateReservedSlots = (selectedHour) => {
  const [h, m] = selectedHour.split(":").map(Number);
  const reserved = [];

  for (let i = 0; i <= 6; i++) { // 3 ore = 7 intervale de 30min
    const nextH = h + Math.floor((m + i * 30) / 60);
    const nextM = (m + i * 30) % 60;
    const nextSlot = `${String(nextH).padStart(2, "0")}:${String(nextM).padStart(2, "0")}`;
    reserved.push(nextSlot);
  }

  return reserved;
};

// === FUNCȚIE: trimite rezervarea în Firebase ===
const handleReservationSubmit = async (e) => {
  e.preventDefault();
  if (!selectedDate || !selectedHour || !name || !phone) {
    alert("Completează toate câmpurile!");
    return;
  }

  const key = formatDateKey(selectedDate);
  const reservedSlots = generateReservedSlots(selectedHour);

  try {
    await setDoc(doc(db, "reservations", `${key}-${selectedHour}`), {
      name,
      phone,
      date: key,
      hour: selectedHour,
      reservedSlots,
      timestamp: new Date().toISOString(),
    });

    // actualizăm state-ul local
    setBookedTimes(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), ...reservedSlots],
    }));

    alert("✅ Rezervarea a fost făcută cu succes!");
    setName("");
    setPhone("");
    setSelectedDate("");
    setSelectedHour("");
  } catch (error) {
    console.error("❌ EROARE DETALIATĂ:", error);
    alert("❌ A apărut o eroare la trimiterea rezervării. Încearcă din nou.");
  }
};

// === FUNCȚIE: returnează orele disponibile ===
const getAvailableHours = () => {
  if (!selectedDate) return hours.map(h => ({ hour: h, available: true }));

  const key = formatDateKey(selectedDate);
  const booked = bookedTimes[key] || [];
  const now = new Date();

  return hours.map(hour => {
    const [h, m] = hour.split(":").map(Number);
    const slotTime = new Date(selectedDate);
    slotTime.setHours(h, m, 0, 0);

    // dacă e azi și ora a trecut — indisponibilă
    const sameDay =
      slotTime.getFullYear() === now.getFullYear() &&
      slotTime.getMonth() === now.getMonth() &&
      slotTime.getDate() === now.getDate();

    if (sameDay && slotTime <= now) {
      return { hour, available: false, reason: "indisponibil (ora trecută)" };
    }

    // verificăm dacă slotul curent e deja rezervat
    const free = !booked.includes(hour);
    return { hour, available: free, reason: free ? "" : "ocupat" };
  });
};







//  Achitarea cu STRIPE ///////////////////////////////////
  // const handleStripePayment = async () => {
  //   if (stripePaid) return;

  //   if (
  //     !userName.trim() ||
  //     !userPhone.trim() ||
  //     !form.current.user_email.value.trim() ||
  //     !selectedDate ||
  //     !selectedTime
  //   ) {
  //     form.current.reportValidity(); 
  //     return;
  //   }

  //   const reservationData = {
  //     name: userName,
  //     email: userEmail,
  //     phone: userPhone,
  //     selectedDate: selectedDate instanceof Date ? selectedDate.toISOString() : selectedDate,
  //     selectedTime,
  //     childrenCount,
  //     piniataSelected,
  //     fotoSelected,
  //     totalAmount,
  //   };
  //   localStorage.setItem("reservationData", JSON.stringify(reservationData));

  //   try {
  //     setStatus("Se pregătește plata...");

  //     const response = await axios.post("http://192.168.100.47:4242/create-checkout-session", { amount: totalAmount });
  //     if (response.data?.url) window.location.href = response.data.url;
  //   } catch (err) {
  //     console.error(err);
  //     setStatus("Eroare la generarea link-ului Stripe.");
  //   }
  // };


// ✉️ 3. Funcția completă de trimitere email
const sendEmail = async (e) => {
  e.preventDefault();

  if (!selectedDate || !selectedTime) {
    setStatus("❗ Te rog selectează data și ora!");
    return;
  }

  if (payOnline && !paymentAmount) {
    setStatus("❗ Finalizează plata online înainte de rezervare!");
    return;
  }

  const dateKey = formatDateKey(selectedDate);
  const booked = bookedTimes[dateKey] || [];

  // 🔒 Verificare dacă ora este deja ocupată
  if (booked.includes(selectedTime)) {
    setStatus("❌ Ora selectată este deja ocupată. Te rugăm să alegi o altă oră!");
    return; // Oprește rezervarea
  }

  try {
    // 🔑 Generare token unic pentru anulare
    const cancelToken = Math.random().toString(36).substring(2, 12);

    // 🗂️ Salvare rezervare în Firebase
    const docRef = doc(collection(db, "reservations"));
    await setDoc(docRef, {
      id: docRef.id,
      name: userName,
      email: userEmail,
      phone: userPhone,
      date: dateKey,
      time: selectedTime,
      children_count: childrenCount,
      piniata: piniataSelected,
      foto: fotoSelected,
      message: userMessage, // mesaj client
      payment: payOnline ? "Online" : "La fața locului",
      total_amount: totalAmount,
      cancelToken, // token unic pentru anulare
      timestamp: new Date(),
    });

    console.log("✅ Rezervare salvată în Firebase!");
    setStatus("📨 Se trimite rezervarea...");

    // 📨 Email către CLIENT (fără link de anulare)
    await emailjs.send(
      "service_wz0osns",
      "template_k41iqd4",
      {
        to_email: userEmail,
        to_name: userName,
        reservation_date: dateKey,
        reservation_time: selectedTime,
        children_count: childrenCount,
        total_amount: totalAmount,
        payment_method: payOnline ? "Online (Achitat)" : "La fața locului",
        piniata: piniataSelected ? "DA" : "NU",
        foto: fotoSelected ? "DA" : "NU",
        message: userMessage, // opțional pentru client
      },
      "_vqTkQTe_UKMth5Js"
    );

    // 🔗 Link de anulare pentru proprietar
    // const cancelLink = `http://192.168.100.47:5173/cancel?docId=${docRef.id}&token=${cancelToken}`;
    const cancelLink = `https://neon-time-ww3j.vercel.app/cancel?docId=${docId}&token=${token}`;


    // 📨 Email către PROPRIETAR (cu link de anulare)
    await emailjs.send(
      "service_wz0osns",
      "template_p1htu8o",
      {
        to_email: "asusvivobook1987@gmail.com", // proprietar
        to_name: "Neon Time",
        client_name: userName,
        client_email: userEmail,
        client_phone: userPhone,
        reservation_date: dateKey,
        reservation_time: selectedTime,
        children_count: childrenCount,
        total_amount: totalAmount,
        payment_method: payOnline ? "Online (Achitat)" : "La fața locului",
        piniata: piniataSelected ? "DA" : "NU",
        foto: fotoSelected ? "DA" : "NU",
        message: userMessage, // mesaj client
        cancel_link: cancelLink, // doar proprietar
      },
      "_vqTkQTe_UKMth5Js"
    );

    // ✅ Confirmare vizibilă în formular
    // setStatus("✅ Rezervarea a fost trimisă cu succes! ✨");
    // ✅ Confirmare vizuală copilărească
setShowConfetti(true);
setStatus("🎉 Rezervarea ta a fost trimisă cu succes! Neon Time te așteaptă!");
statusRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

// Ascunde confetti după 4 secunde
setTimeout(() => setShowConfetti(false), 4000);
    statusRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

    // 🔄 Resetare formular
    form.current.reset();
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setUserMessage("");
    setSelectedDate(null);
    setSelectedTime("");
    setChildrenCount(10);
    setPiniataSelected(false);
    setFotoSelected(false);
    setPayOnline(false);
    setPaymentAmount(null);

    localStorage.removeItem("reservationData");

  } catch (err) {
    console.error("❌ EROARE DETALIATĂ:", err);
    alert("❌ A apărut o eroare la trimiterea rezervării. Încearcă din nou.");
  }
};

  return (
    <div className="reservation-form-neon">
      <h3>📩 Rezervă Acum la Neon Time!</h3>
        {/* … inputurile și opțiunile rămân neschimbate */}
        <form ref={form} onSubmit={sendEmail}>
          {/* Nume: doar litere și spații */}
        <input
  type="text"
  name="user_name"
  placeholder="Numele tău"
  value={userName}
  onChange={(e) => {
    // elimină orice caracter care nu e literă sau spațiu
    const filtered = e.target.value.replace(/[^A-Za-z\s]/g, "");
    setUserName(filtered);
  }}
  pattern="[A-Za-z\s]{2,}"
  title="Numele trebuie să conțină doar litere și spații, minim 2 caractere."
  required
/>
        <input
          type="email"
          name="user_email"
          placeholder="Email-ul tău"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        {/* Telefon: doar cifre */}
          <input
            type="tel"
            name="user_phone"
            placeholder="Telefon"
            value={userPhone}
            onChange={(e) => {
              // elimină orice caracter care nu e cifră
              const filtered = e.target.value.replace(/\D/g, "");
              setUserPhone(filtered);
            }}
            pattern="\d{6,15}"
            title="Telefon invalid. Folosește doar cifre, minim 6 și maxim 15."
            required
          />
           <h4></h4>
           {/* ///////////////////////////////////////// */}

               
                {/* Data & Ora */}
       <h4></h4>
       <div className="datetime-container flex flex-col gap-4">
  <h4 className="datetime-title">Rezervă Data & Ora</h4>
  <div className="date-picker-wrapper">
    <label>📅 Data rezervării:</label>
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      locale="ro"
      dateFormat="dd/MM/yyyy"
      minDate={new Date()}
      placeholderText="Luna / Zi"
      required
    />
  </div>

  <div className="time-picker-wrapper">
    <label>⏰ Ora rezervării:</label>
    <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required>
      <option value="">-- Alege ora --</option>
      {getAvailableHours().map(({ hour, available }) => (
        <option key={hour} value={hour} disabled={!available}>
          {hour} {available ? "" : " (ocupat)"}
        </option>
      ))}
    </select>
  </div>
</div>







        {/* ///////////////////////////////////////////////////// */}

            
             {/* Opțiuni suplimentare */}
        <div className="neon-wrapper">  {/* <-- DOAR acest div nou adăugat */}
        <h4>🎉 Opțiuni Suplimentare</h4>
        <div className="extras-cards">
          <label className={`card ${piniataSelected ? "selected" : ""}`}>
            <input type="checkbox" checked={piniataSelected} readOnly />
            <div className="card-content" onClick={() => setPiniataSelected(!piniataSelected)}>
              <p>Piniata: +{piniataPrice} lei </p>
            </div>
          </label>
          <label className={`card ${fotoSelected ? "selected" : ""}`}>
            <input type="checkbox" checked={fotoSelected} readOnly />
            <div className="card-content" onClick={() => setFotoSelected(!fotoSelected)}>
              <p>Serviciu Foto: +{fotoPrice} lei </p>
            </div>
          </label>
        </div>
        <h4></h4>
 </div>
 
{/* /////////////////////////////////////////////////////////////// */}
       

        {/* Pachet copii */}
        <div className="children-package-card">
          <h4>Pachet copii </h4>
          <p>Pachet Standart 10 Copii</p>
          <div className="children-counter">
            <button type="button" onClick={() => setChildrenCount(Math.max(10, childrenCount - 1))}>-</button>
            <span>{childrenCount}</span>
            <button type="button" onClick={() => setChildrenCount(childrenCount + 1)}>+</button>
          </div>

          <p>Copii extra: {extraChildrenCount} × {extraChildrenPrice} lei</p>
          <div className="form-group total-amount">
            <p><strong>Total de plată: {totalAmount} lei</strong></p>
          </div>
           <h4></h4>
        </div>






{/* ///////////////////////////////////////////////////////// */}


 {/* Metoda de plată */}
        {/* <h4>💳 Metoda de plată</h4>
        <div className="payment-cards">
          <label className={`card ${payOnline ? "selected" : ""}`}>
            <input type="checkbox" checked={payOnline} readOnly />
            <div className="card-content" onClick={() => setPayOnline(true)}>
              <p>Achită Online</p>
            </div>
          </label>
          <label className={`card ${!payOnline ? "selected" : ""}`}>
            <input type="checkbox" checked={!payOnline} readOnly />
            <div className="card-content" onClick={() => setPayOnline(false)}>
              <p>La fața locului</p>
            </div>
          </label>
        </div> */}


        {/* Formular card test */}
        {/* {payOnline && (
          <button
            type="button"
            onClick={handleStripePayment}
            disabled={stripePaid} 
            style={{
              backgroundColor: stripePaid ? "#aaa" : "#ff3c78",
              color: "#fff",
              padding: "10px 20px",
              margin: "20px",
              borderRadius: "12px",
              border: "none",
              cursor: stripePaid ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            💳 Plătește Online
          </button>
        )} */}


        
         {/* Mesaj */}
        {/* <textarea name="message" placeholder="Mesaj / Opțiuni suplimentare" /> */}

        {/* Hidden fields */}
        <input type="hidden" name="reservation_date" value={selectedDate ? formatDateKey(selectedDate) : ""} />
        <input type="hidden" name="reservation_time" value={selectedTime} />
        <input type="hidden" name="children_count"   value={childrenCount} />
        <input type="hidden" name="piniata"          value={piniataSelected ? "DA" : "NU"} />
        <input type="hidden" name="foto"             value={fotoSelected ? "DA" : "NU"} />
        <input type="hidden" name="payment_method"   value={payOnline ? "Online (Achitat)" : "Achitam pe Loc"} />
        <input type="hidden" name="total_amount"     value={totalAmount} />


<div className="flex flex-col mb-3">
  <label htmlFor="user_message" className="text-white mb-1">
    {/* Mesajul tău: */}
    <h4 className="your-message">Mesajul tău:</h4>
  </label>
  <textarea
    id="user_message"
    name="user_message"
    value={userMessage}
    onChange={(e) => setUserMessage(e.target.value)}
    placeholder="Scrie aici un mesaj pentru Neon Time..."
    className="p-2 rounded-lg border border-gray-500 bg-gray-800 text-white"
    rows="4"
  ></textarea>
</div>



         <button id="reservation_submit"
                 type="submit"
                 className="reservation-submit-btn"
              >
                  📤 Trimite Rezervare
            </button>

      </form>

      {status && <p className="form-status" ref={statusRef}>{status}</p>}
    </div>
  );
  
}
