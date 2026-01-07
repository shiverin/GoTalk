import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function CreateCommunityModal({ onClose }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [rules, setRules] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/communities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, description: desc, isPrivate, rules }),
      });

      if (!res.ok) throw new Error("Failed to create community");

      alert("Community created successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error creating community.");
    } finally {
      setLoading(false);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-none flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[52vw] h-[72vh] rounded-xl shadow-xl p-4 animate-fadeIn flex flex-col gap-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header spanning full width */}
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-2xl font-[700]">Tell us about your community</h2>
          <p className="text-gray-600 text-sm">
            A name and description help people understand what your community is all about.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-6 flex-1">
          {/* Left Column: Form */}
          <div className="flex-[8] flex flex-col gap-4">
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              {/* Community Name */}
              <div className="relative w-full">
                <input
                  id="community-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Community Name"
                  required
                  className="peer w-full border rounded-2xl px-4 py-3 bg-[#E5EBEE] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
                <label
                  htmlFor="community-name"
                  className={`absolute left-4 text-gray-400 text-sm transition-all cursor-text
                  ${name ? "top-1 text-xs text-gray-700" : "top-3 text-base"}
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                  peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700`}
                >
                  Community Name <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Description */}
              <div className="relative w-full">
                <textarea
                  id="community-desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Short description…"
                  className="peer w-full border rounded-2xl px-4 py-3 bg-[#E5EBEE] placeholder-transparent resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
                <label
                  htmlFor="community-desc"
                  className={`absolute left-4 text-gray-400 text-sm transition-all cursor-text
                  ${desc ? "top-1 text-xs text-gray-700" : "top-3 text-base"}
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                  peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700`}
                >
                  Description
                </label>
              </div>

              {/* Privacy Checkbox */}
              <div className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  id="private"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="h-4 w-4 accent-blue-500"
                />
                <label htmlFor="private" className="cursor-pointer">
                  Private Community
                </label>
              </div>

              {/* Rules */}
              <div className="relative w-full">
                <textarea
                  id="community-rules"
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                  placeholder="Add community rules"
                  className="peer w-full border rounded-2xl px-4 py-3 bg-[#E5EBEE] placeholder-transparent resize-none h-16 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
                />
                <label
                  htmlFor="community-rules"
                  className={`absolute left-4 text-gray-400 text-sm transition-all cursor-text
                  ${rules ? "top-1 text-xs text-gray-700" : "top-3 text-sm"}
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                  peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-700`}
                >
                  Rules (optional)
                </label>
              </div>

            </form>
          </div>

{/* Right Column: Live Preview */}
<div className="flex-[6] min-w-0"> {/* important: min-w-0 allows flex child to shrink */}
  <div className="border rounded-xl p-4 bg-white shadow-md w-full break-words">
    <h3 className="text-lg font-semibold mb-1">{name || "r/YourCommunity"}</h3>
    <div className="text-gray-500 text-xs mb-2">
      1 weekly visitor · 1 weekly contributor
    </div>
    <p className="text-gray-700 text-sm">{desc || "Your community description"}</p>
    {rules && (
      <div className="mt-2 p-2 bg-gray-50 text-gray-600 text-xs rounded-md break-words">
        <strong>Rules:</strong> {rules}
      </div>
    )}
  </div>
</div>


        </div>
              {/* Buttons */}
                <div className="flex justify-end gap-3 mt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                >
                    Cancel
                </button>
                <button
                    type="button"   
                    onClick={handleCreate} 
                    disabled={loading}
                    className="px-4 py-2 rounded-full bg-[#0B449B] text-white hover:bg-[#0A2F6C] transition disabled:opacity-50"
                >
                    {loading ? "Creating…" : "Create"}
                </button>
                </div>
      </div>
    </div>,
    document.body
  );
}
