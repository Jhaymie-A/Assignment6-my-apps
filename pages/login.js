import { useState } from "react";
import { useRouter } from "next/router";
import { authenticateUser } from "../lib/authenticate";

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(userName, password);
      router.push("/favourites");
    } catch (err) {
      setError("Login failed: " + err.message);
    }
  }

  return (
    <main className="container mt-4">
      <div className="p-4 mb-4 bg-light rounded-3">
        <h1 className="mb-0">Login</h1>
        <p className="lead">Enter your login information below:</p>
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

        <button className="btn btn-primary">Log In</button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </main>
  );
}
