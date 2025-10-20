import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/Offres.css";

export default function Offres() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/offres")
      .then((res) => {
        setOffres(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des offres...</p>;

  const ajouterauPanier = (offre) => {
    
    
    // Ajouter l'offre au panier
  const panier = [offre];
    // Sauvegarder dans localStorage
    localStorage.setItem("panier", JSON.stringify(panier));

    //alert(`${offre.type} ajouté au panier !`);

    navigate("/panier");
  };

  return (
    <div className="offres-container">
      <h2>Offres disponibles</h2>
      <div className="offres-grid">
        {offres.map((offre) => (
          <div key={offre.id} className="offre-card">
            <h3>{offre.type}</h3>
            <p>{offre.description}</p>
            <p className="prix">{offre.prix} €</p>
            <button onClick={() => ajouterauPanier(offre)}>Ajouter au panier</button>
          </div>
        ))}
      </div>
    </div>
  );
}
