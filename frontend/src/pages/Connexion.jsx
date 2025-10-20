import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/Auth.css";

export default function Connexion() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", motdepasse: "" });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:4000/api/utilisateurs/connexion", form);
      setMessage("Vous etes bien connecté!");

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token); // sauvegarde du token
      navigate("/offres");
    } catch (err) {
      setMessage(" Erreur : " + (err.response?.data?.error || "Serveur indisponible"));
    }
  };

  return (
    <div className="auth-container">
      <h2>Connecter vous pour <br/> réserver un billet</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="motdepasse" placeholder="Mot de passe" value={form.motdepasse} onChange={handleChange} required />
        <button type="submit">Se connecter</button>
      </form>
      {message && <p className="message">{message}</p>}
      {token && <p className="token">Token: {token.slice(0, 20)}...</p>}
    </div>
  );
}
