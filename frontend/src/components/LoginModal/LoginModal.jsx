import { useEffect, useState } from "react";
import { X } from "lucide-react";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";
import SignupForm from "../SignupForm/SignupForm.jsx";

export default function LoginModal({ open, onClose }) {
  const [mode, setMode] = useState("login"); // 🔹 mode state now inside modal

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

        <h2 className="text-2xl font-bold mt-8 mb-2">
          {mode === "login" ? "Log In" : "Sign Up"}
        </h2>

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

        {mode === "login" ? (
          <LoginForm onClose={onClose} switchMode={() => setMode("signup")} />
        ) : (
          <SignupForm onClose={onClose} switchMode={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}
