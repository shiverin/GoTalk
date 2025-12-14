import React from "react";  
  
export default function Card({ image, title, description, subforum, url }) {   
  const cardContent = (  
    <div className="relative flex-shrink-0 w-[278px] h-52 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">  
      {/* Background Image */}  
      {image && (  
        <img  
          src={image}  
          alt={title}  
          className="absolute inset-0 w-full h-full object-cover"  
        />  
      )}
  
      {/* Overlay */}  
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end pb-2 pl-3">  
        {/* Top Section: Title & Description */}  
        <div>  
          {title && <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>}  
          {description && <p className="text-sm text-white line-clamp-1">{description}</p>}  
        </div>  
  
        {/* Bottom Section: Subforum Info */}  
        {subforum && (  
          <div className="mt-2">  
            {subforum}  
          </div>  
        )}  
      </div>  
    </div>  
  );  
  
  // If a URL is provided, wrap the card in an anchor tag  
  if (url) {  
    return (  
      <a href={url} target="_blank" rel="noopener noreferrer">  
        {cardContent}  
      </a>  
    );  
  }  
  
  // Otherwise, just return the card div  
  return cardContent;  
}