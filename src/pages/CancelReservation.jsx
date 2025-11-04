// CancelReservation.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

export default function CancelReservation() {
  const [status, setStatus] = useState("🔄 Se verifică linkul...");
  const [docId, setDocId] = useState(null);
  const [token, setToken] = useState(null);
  const [showButton, setShowButton] = useState(false);

  // Preluăm query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("docId");
    const t = params.get("token");

    if (!id || !t) {
      setStatus("❌ Link invalid sau incomplet!");
      return;
    }

    setDocId(id);
    setToken(t);
    setShowButton(true);
    setStatus(""); // ascundem mesajul inițial
  }, []);

  const handleDelete = async () => {
    if (!docId || !token) return;

    const confirmed = window.confirm(
      "⚠️ Ești sigur că vrei să ștergi această rezervare?"
    );

    if (!confirmed) {
      setStatus("❌ Anulare rezervare anulată.");
      return;
    }

    try {
      const docRef = doc(db, "reservations", docId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setStatus("❌ Rezervarea nu există sau a fost deja ștearsă.");
        setShowButton(false);
        return;
      }

      const data = docSnap.data();
      if (data.cancelToken !== token) {
        setStatus("❌ Token invalid. Nu poți șterge această rezervare.");
        setShowButton(false);
        return;
      }

      await deleteDoc(docRef);
      setStatus("✅ Rezervarea a fost ștearsă cu succes!");
      setShowButton(false);
    } catch (err) {
      console.error(err);
      setStatus("❌ A apărut o eroare la ștergerea rezervării.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        fontSize:"25px",
        // backgroundColor: "#9d9d99ff",
        borderRadius: "50px",
        
        boxShadow: "0 0 10px 1px rgba(245, 242, 242, 1)",
        border: "3px solid black",
        color: "#ffffffff",
      }}
    >
      <h2>Anulare Rezervare</h2>
      {status && <p style={{ margin: "20px 0", fontSize: "16px" }}>{status}</p>}
      {showButton && (
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "#fdfdfdff",
            color: "#fa0707ff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            boxShadow: "0 0 10px 1px rgba(247, 247, 247, 0.97)",
          }}
        >
          🗑️ Șterge Rezervarea
        </button>
      )}
    </div>
  );
}
