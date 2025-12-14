import React, { useRef, useState, useEffect } from "react";
import Card from "../Card/Card.jsx";

export default function Carousel({ cards }) {
  const containerRef = useRef();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const skip = 2; // number of cards to skip per click
  const cardWidth = 294; // width of one card + margin

  // Update scroll buttons visibility
  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.offsetWidth < container.scrollWidth
    );
  };

  const scroll = (direction) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "right" ? cardWidth * skip : -cardWidth * skip,
        behavior: "smooth",
      });
    }
  };

  // Add scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons(); // initialize
    return () => container.removeEventListener("scroll", updateScrollButtons);
  }, []);

  return (
    <div className="relative w-full">
      {/* Left Button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="
            absolute left-3 top-1/2 -translate-y-1/2 z-10
            w-8 h-8 rounded-full
            bg-black/50 backdrop-blur-sm
            flex items-center justify-center
            text-white text-lg font-semibold
            hover:bg-black/70
            active:scale-95
            transition
          "
        >
          ‹
        </button>
      )}

      {/* Right Button */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="
            absolute right-3 top-1/2 -translate-y-1/2 z-10
            w-8 h-8 rounded-full
            bg-black/50 backdrop-blur-sm
            flex items-center justify-center
            text-white text-lg font-semibold
            hover:bg-black/70
            active:scale-95
            transition
          "
        >
          ›
        </button>
      )}

      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto space-x-4 scroll-smooth pt-4 scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {cards.map((card, idx) => (
          <div key={idx} className="flex-shrink-0 scroll-snap-align-start">
            {card}
          </div>
        ))}
      </div>
    </div>
  );
}
