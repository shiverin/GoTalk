import React, { useState } from "react";
import PillButton from "../../components/PillButton/PillButton.jsx";

export default function CommentBar({ query, setQuery, onSubmit }) {
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    onSubmit();
    setExpanded(false);
    setQuery("");
  };

  const handleCancel = () => {
    setQuery("");
    setExpanded(false);
  };

  return (
    <div className="w-full mt-3">

      {/* --- COLLAPSED BAR (like Reddit) --- */}
      {!expanded && (
        <div
          onClick={() => setExpanded(true)}
          className="w-full rounded-full border bg-white hover:bg-gray-100 px-4 py-2 
                     cursor-text text-gray-600 text-sm"
        >
          Add your reply
        </div>
      )}

      {/* --- EXPANDED BAR --- */}
      {expanded && (
        <form
          onSubmit={handleSubmit}
          className="w-full border rounded-2xl bg-white p-4 flex flex-col gap-3"
        >
          {/* TEXTAREA */}
          <textarea
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder=""
            className="w-full h-6 resize-none outline-none text-sm bg-transparent"
          />

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-2">

            {/* CANCEL BUTTON — grey pill */}
            <PillButton
              onClick={handleCancel}
              bgcolor="#E5EBEE"
              txtcolor="black"
              height={36}
            >
              Cancel
            </PillButton>

            {/* COMMENT BUTTON — blue pill */}
            <PillButton
              type="submit"
              bgcolor="#0B449B"
              txtcolor="white"
              height={36}
              className={query.trim() ? "" : "opacity-50 cursor-not-allowed"}
            >
              Comment
            </PillButton>
          </div>
        </form>
      )}
    </div>
  );
}
