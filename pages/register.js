import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "../lib/authenticate";

export default function Register() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(userName, password, password2);
      router.push("/login");
    } catch (err) {
      setError("Registration failed: " + err.message);
    }
  }

  return (
    <main className="container mt-4">
      <div className="p-4 mb-4 bg-light rounded-3">
        <h1 className="mb-0">Register</h1>
        <p className="lead">Register for an account:</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="form-label">User:</label>
        <input
          className="form-control"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        /><br />

        <label className="form-label">Password:</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <label className="form-label">Confirm Password:</label>
        <input
          className="form-control"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        /><br />

        <button className="btn btn-primary">Register</button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </main>
  );
}
