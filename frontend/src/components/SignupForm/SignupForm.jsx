import { useState } from "react";

export default function SignupForm({ onClose, switchMode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
        setError("All fields are required.");
        return;
    }
    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    setError("");
    setLoading(true);

    try {
        const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password }), // match backend keys
        });

        const text = await res.text(); // parse as text first
        if (!res.ok) {
        setError(text || "Registration failed.");
        setLoading(false);
        return;
        }

        const data = JSON.parse(text); // try parse JSON if backend returns it
        localStorage.setItem("token", data.token || "");
        // Registration succeeded
        setError("Registration successful! Please log in."); // reuse error state for message
        setLoading(false);

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
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="peer w-full border rounded-full px-4 py-4 bg-[#E5EBEE] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
        <label
          htmlFor="username"
          className={`absolute left-4 text-gray-400 text-sm transition-all cursor-text
            ${username ? 'top-1 text-xs text-gray-700' : 'top-4 text-base'}
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
            peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700`}
        >
          Username <span className="text-[#ae2c01]">*</span>
        </label>
      </div>

      <div className="relative w-full mb-2">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="peer w-full border rounded-full px-4 py-4 bg-[#E5EBEE] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
        <label
          htmlFor="password"
          className={`absolute left-4 text-gray-400 text-sm transition-all cursor-text
            ${password ? 'top-1 text-xs text-gray-700' : 'top-4 text-base'}
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
            peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700`}
        >
          Password <span className="text-[#ae2c01]">*</span>
        </label>
      </div>

      <div className="relative w-full mb-2">
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="peer w-full border rounded-full px-4 py-4 bg-[#E5EBEE] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
        <label
          htmlFor="confirmPassword"
          className={`absolute left-4 text-gray-400 text-sm transition-all cursor-text
            ${confirmPassword ? 'top-1 text-xs text-gray-700' : 'top-4 text-base'}
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
            peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700`}
        >
          Confirm Password <span className="text-[#ae2c01]">*</span>
        </label>
      </div>


      <p className="flex flex-col gap-1 w-full text-sm text-left mt-2">
        <div className="text-gray-600">Already have an account? </div>
        <div className="text-blue-600 cursor-pointer w-fit" onClick={switchMode}>
          Login?
        </div>
      </p>

        {error && (
        <p
            className={`text-sm mb-2 ${
            error.includes("successful") ? "text-green-600" : "text-red-500"
            }`}
        >
            {error}
        </p>
        )}

      <button
        onClick={handleRegister}
        disabled={loading}
        className={`w-full bg-[#D93901] text-white rounded-full py-2 font-semibold mt-auto mb-8 hover:bg-[#AE2C01] ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Registering..." : "Continue"}
      </button>

    </>
  );
}
