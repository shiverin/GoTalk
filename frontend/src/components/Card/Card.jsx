import React from "react";

export default function Card({ image, title, description, buttonText, onButtonClick }) {
  return (
    <div className="relative flex-shrink-0 w-[278px] h-52 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Background Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end items-start p-4">
        <div className="flex flex-col items-start">
          {title && <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>}
          {description && <p className="text-sm text-white">{description}</p>}
        </div>

        {buttonText && onButtonClick && (
          <button
            onClick={onButtonClick}
            className="bg-blue-600 text-white text-sm font-medium px-3 py-2 rounded hover:bg-blue-700 transition-colors mt-2"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
