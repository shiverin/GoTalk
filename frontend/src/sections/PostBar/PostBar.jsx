import React from "react";

export default function PostBar({ communityName = "g/Go" }) {
  const rules = [
    "Be civil. Respect GoTalkquette and follow GoTalk sitewide rules.",
    "No memes, overdone references, price complaints, text-heavy posts, or other low-quality posts.",
    "No politics, pushing agendas, or grandstanding.",
    "Hide or blur personal info such as full names, numbers, and addresses.",
    "No promotions.",
  ];

  return (
    <div
      className="sticky top-[8vh] w-[25vw] rounded-md flex flex-col overflow-y-auto transition-all duration-300 h-[654px] pr-16"
    >
      <div className="pt-0 px-4 bg-gray-50 rounded-md pb-5 flex flex-col gap-4">
        {/* Header */}
        <h2 className="text-sm font-semibold mb-2">g/{communityName}'s Rules</h2>

        {/* Rules List */}
        <ol className="list-decimal list-inside text-xs text-gray-700 space-y-2 overflow-y-auto max-h-[500px]">
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ol>
      </div>

      {/* Footer Links */}
      <div className="flex flex-col gap-1 text-gray-500 text-xs mt-8 pb-[13px]">
        <div className="flex flex-wrap gap-2">
          <span className="hover:underline cursor-pointer">goTalk Rules</span>
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">User Agreement</span>
        </div>
        <div className="mt-1">
          Accessibility • goTalk © 2025. All rights reserved by Shizhen Zhao.
        </div>
      </div>
    </div>
  );
}
