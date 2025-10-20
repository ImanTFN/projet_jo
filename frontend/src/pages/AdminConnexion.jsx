import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/Admin.css";

export default function connexionAdmin() {
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const navigation = useNavigate();
  const [token, setToken] =useState("");

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    try {
      console.log("okkkkkk");
      const res = await axios.post("http://localhost:4000/api/admin/connexion", { email, motdepasse });
      
      setToken(res.data.token);
      //console.log("fait");
      localStorage.setItem("adminToken", res.data.token);
      //alert(res.data.message || "Connexion réussite!");
      navigation("/admin/dashboard");
    } catch (err) {
      alert("Erreur de login d'admin");
    }
  };

  return (
    <div className="page-container">
      <h2>Connexion Administrateur</h2>
      <form onSubmit={handleSubmit} className="login-form">
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
      <input type="password" placeholder="Mot de passe" value={motdepasse} onChange={e=>setMotdepasse(e.target.value)} required/>
      <button type="submit">Se connecter</button>
    </form>
      {token && <p className="token">Token: {token.slice(0, 20)}...</p>}
    </div>
  );
}
