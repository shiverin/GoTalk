import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";

export default function LoginForm({ onClose, switchMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const text = await res.text();

      if (!res.ok) {
        setError(text); // display backend message
        setLoading(false);
        return;
      }

      let data;
      try {
        data = JSON.parse(text); // expect { token: "..." }
      } catch {
        data = { token: "" };
      }

      // Store token and update auth context
      login({ token: data.token || "", username: email });

      setLoading(false);
      onClose?.(); // close modal
    } catch (err) {
      console.error(err);
      setError("Network error. Try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative w-full mb-3">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="peer w-full border rounded-full px-4 py-4 bg-[#E5EBEE] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
        <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all 
                           peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                           peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700">
          Email or username <span className="text-[#ae2c01]">*</span>
        </label>
      </div>

      <div className="relative w-full mb-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="peer w-full border rounded-full px-4 py-4 bg-[#E5EBEE] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
        <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all
                           peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                           peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700">
          Password <span className="text-[#ae2c01]">*</span>
        </label>
      </div>

      <div className="text-sm text-blue-600 mb-3 cursor-pointer">Forgot password?</div>

      <p className="flex flex-col gap-1 w-full text-sm text-left mt-10">
        <div className="text-gray-600">New to goTalk? </div>
        <div className="text-blue-600 cursor-pointer w-fit" onClick={switchMode}>
          Sign Up
        </div>
      </p>

      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

      <button
        onClick={handleLogin}
        disabled={loading}
        className={`w-full bg-[#D93901] text-white rounded-full py-2 font-semibold mt-auto mb-8 hover:bg-[#AE2C01] transition-colors ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Logging in..." : "Continue"}
      </button>
    </>
  );
}
