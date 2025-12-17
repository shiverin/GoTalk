import { useEffect, useState } from "react";
import { X } from "lucide-react";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";

export default function LoginModal({ open, onClose, title, children }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center py-2">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative h-full w-full max-w-[36vw] bg-white rounded-2xl shadow-lg p-20 z-10 flex flex-col items-center ">
        <div className="absolute top-6 right-6">
          <CircleButton
            Icon={<X className="w-[18px] h-[18px] text-black" />}
            onClick={onClose}
            size={8}
            buttonColor="#e5ebee"
          />
        </div>

        {title && <h2 className="text-2xl font-bold mt-8 mb-2">{title}</h2>}

        <p className="text-sm text-gray-600 mb-4">
          By continuing, you agree to our{" "}
          <span className="text-blue-600 cursor-pointer">User Agreement</span>{" "}
          and acknowledge that you understand the{" "}
          <span className="text-blue-600 cursor-pointer">Privacy Policy</span>.
        </p>

        <div className="w-full flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">Welcome</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* 🔹 This is the section you swap via children */}
        {children}

      </div>
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import CircleButton from "../../components/CircleButton/CircleButton.jsx";


// export default function LoginModal({ open, onClose }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (open) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [open]);

//   if (!open) return null;


//   const handleLogin = async () => {
//     setError("");       // reset previous errors
//     setLoading(true);   // show loading state
//     try {
//       const res = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Login failed");
//         setLoading(false);
//         return;
//       }

//       // Success: store token and close modal
//       localStorage.setItem("token", data.token); // assuming backend returns { token: "..." }
//       setLoading(false);
//       onClose();
//     } catch (err) {
//       console.error(err);
//       setError("Network error. Try again.");
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center py-2">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/50"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="relative h-full w-full max-w-[36vw] bg-white rounded-2xl shadow-lg p-20 z-10 flex flex-col items-center justify-center">
//         <div className="absolute top-6 right-6">
//           <CircleButton
//             Icon={<X className="w-[18px] h-[18px] text-black" />}
//             onClick={onClose}
//             size={8} // adjust if needed
//             buttonColor="#e5ebee"
//           />
//         </div>

//         <h2 className="text-2xl font-bold mb-2">Log In</h2>
//         <p className="text-sm text-gray-600 mb-4">
//           By continuing, you agree to our{" "}
//           <span className="text-blue-600 cursor-pointer">User Agreement</span>{" "}
//           and acknowledge that you understand the{" "}
//           <span className="text-blue-600 cursor-pointer">Privacy Policy</span>.
//         </p>

//         {/* <button className="w-full border rounded-full py-2 mb-3 hover:bg-gray-50">
//           Continue With Phone Number
//         </button>

//         <button className="w-full border rounded-full py-2 mb-4 hover:bg-gray-50">
//           Email me a one-time link
//         </button> */}

//         <div className="w-full flex items-center my-4">
//           <hr className="flex-grow border-gray-300" />
//           <span className="px-2 text-gray-500 text-sm">Welcome</span>
//           <hr className="flex-grow border-gray-300" />
//         </div>

//         <div className="relative w-full mb-3">
//           <input
//             type="text"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             className="peer w-full border rounded-full px-4 py-4 bg-[#E5EBEE] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
//           />
//           <label
//             htmlFor="email"
//             className="absolute left-4 top-4 text-gray-400 text-sm transition-all 
//                       peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400
//                       peer-placeholder-shown:text-base
//                       peer-focus:top-1 peer-focus:text-gray-700 peer-focus:text-xs"
//           > 
//             Email or username <span className="text-[#ae2c01]">*</span>
//           </label>
//         </div>

//         <div className="relative w-full mb-2">
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             className="peer w-full border rounded-full px-4 py-4 bg-[#E5EBEE] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
//           />
//           <label
//             htmlFor="password"
//             className="absolute left-4 top-4 text-gray-400 text-sm transition-all
//                       peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400
//                       peer-placeholder-shown:text-base
//                       peer-focus:top-1 peer-focus:text-gray-700 peer-focus:text-xs"
//           >
//             Password <span className="text-[#ae2c01]">*</span>
//           </label>
//         </div>


//         <div className="text-sm text-blue-600 mb-3 cursor-pointer">
//           Forgot password?
//         </div>

//         <p className="flex flex-col gap-1 w-full text-sm text-left mt-0 ">
//           <div className="text-gray-600 ">New to goTalk?{" "}</div>
//           <div className="text-blue-600 cursor-pointer">Sign Up</div>
//         </p>

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className={`w-full bg-[#D93901] text-white rounded-full py-2 font-semibold mt-4 transition-colors hover:bg-[#AE2C01] ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Logging in..." : "Log In"}
//         </button>

//       </div>
//     </div>
//   );
// }
