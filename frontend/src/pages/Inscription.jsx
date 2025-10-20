import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/Auth.css";

export default function Inscription() {
const navigate = useNavigate();
const [form, setForm] = useState({
nom: "",
prenom: "",
email: "",
motdepasse: "",
});
const [message, setMessage] = useState("");

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();
setMessage("");

try {
  const res = await axios.post(
    "http://localhost:4000/api/utilisateurs/inscription",
    form
  );
  setMessage("Compte créé avec succès !");
  setForm({ nom: "", prenom: "", email: "", motdepasse: "" });
  // Redirection après 1 seconde pour que lutilisateur voit le message

  setTimeout(() =>{
    navigate("/connexion");
  },1000);

} catch (err) {
  setMessage(
    " Erreur : " +
      (err.response?.data?.error || "Le serveur est indisponible")
  );
}


};

return (
<div className="auth-container">
<h2>Créer un compte</h2>
<form onSubmit={handleSubmit}>
<input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
<input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
<input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
<input type="password" name="motdepasse" placeholder="Mot de passe" value={form.motdepasse} onChange={handleChange} required />
<button type="submit">S'inscrire</button>
</form>
{message && <p className="message">{message}</p>}
</div>
);
}