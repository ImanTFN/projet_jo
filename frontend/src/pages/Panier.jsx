import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import "./style/Panier.css";

export default function Panier() {
  const [panier, setPanier] = useState(JSON.parse(localStorage.getItem("panier")) || []);
  const [message, setMessage] = useState("");

  const gererPaiement = async () => {
    const token = getToken();
    if (!token) { setMessage("Veuillez vous connecter."); return; }
    if (panier.length === 0) { setMessage("Panier vide"); return; }

    try {
      const idOffre = panier[0].id;

      const res = await axios.post(
        "http://localhost:4000/api/paiements/creer-session-paiement",
        { idOffre },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirection vers Stripe
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("Erreur de paiement");
    }
  };

  const total = panier.reduce((acc, item) => acc + item.prix, 0);

  return (
    <div className="panier-container">
      <h2>Mon panier</h2>
      {panier.length === 0 && <p className="panier-message">Panier vide</p>}
      {panier.map((item, index) => (
        <div key={index} className="panier-item">
          <span>{item.type}</span> <span>{item.prix} €</span>
        </div>
      ))}
      {panier.length > 0 && <p className="panier-total">Total : {total} €</p>}
      <button onClick={gererPaiement} className="panier-btn">Payer</button>
      {message && <p className="panier-message">{message}</p>}
    </div>
  );
}
