import React, { useState } from "react";
import { useAuthStore } from "../auth.store";

const Login = () => {
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password });
      alert("Login success");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />

        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
