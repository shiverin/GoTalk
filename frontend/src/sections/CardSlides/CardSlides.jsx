import React from "react";  
import Carousel from "../../components/Carousel/Carousel.jsx";  
import Card from "../../components/Card/Card.jsx";  
import { FaQuestion } from "react-icons/fa"; // fallback icon

const SubredditInfo = ({ iconUrl, name }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="flex items-center gap-2">
      {iconUrl && !imgError ? (
        <img
          src={iconUrl}
          alt={name}
          className="w-5 h-5 rounded-full"
          onError={() => setImgError(true)} // if image fails to load
        />
      ) : (
        <FaQuestion className="w-5 h-5 text-gray-400" />
      )}
      <span className="text-xs font-medium text-white">{name} <span className=" text-gray-400">and more</span></span>
    </div>
  );
};

export default function CardSlides() {  
  // Array of card data objects with dummy icon URLs  
  const cardData = [  
    {  
      id: 1,  
      image: "https://picsum.photos/300/200?random=1",  
      title: "Exploring the Alps",  
      description: "A stunning view of the mountains during sunrise. The air was crisp and the hike was worth it.",  
      subreddit: "r/travel",
      iconUrl: "https://via.placeholder.com/20/FFA500/FFFFFF?text=T" // dummy icon

    },  
    {  
      id: 2,  
      image: "https://picsum.photos/300/200?random=2",  
      title: "New M2 Max Review",  
      description: "Is the new chip worth the upgrade? A deep dive into performance benchmarks and real-world usage.",  
      subreddit: "r/technology",
      iconUrl: "https://via.placeholder.com/20/0000FF/FFFFFF?text=Tech"  
    },  
    {  
      id: 3,  
      image: "https://picsum.photos/300/200?random=3",  
      title: "Cozy Reading Nook",  
      description: "My happy place. Finally finished setting up my little corner for weekend reading.",  
      subreddit: "r/CozyPlaces",
      iconUrl: "https://via.placeholder.com/20/800080/FFFFFF?text=C"  
    },  
    {  
      id: 4,  
      image: "https://picsum.photos/300/200?random=4",  
      title: "Homemade Sourdough",  
      description: "After many failed attempts, I finally got a good oven spring on my sourdough loaf!",  
      subreddit: "r/baking",
      iconUrl: "https://via.placeholder.com/20/FFFF00/000000?text=B"  
    },  
    {  
      id: 5,  
      image: "https://picsum.photos/300/200?random=5",  
      title: "Minimalist Desk Setup",  
      description: "Keeping it clean and simple for maximum productivity. Less clutter, more focus.",  
      subreddit: "r/battlestations",
      iconUrl: "https://via.placeholder.com/20/00FF00/FFFFFF?text=D"  
    },  
    {  
      id: 6,  
      image: "https://picsum.photos/300/200?random=6",  
      title: "Stray Cat Finds a Home",  
      description: "This little guy showed up on my porch last week. Now he's part of the family.",  
      subreddit: "r/aww",
      iconUrl: "https://via.placeholder.com/20/FFC0CB/000000?text=A"  
    }  
  ];  

  // Map the data to your Card components  
  const cards = cardData.map(data => (  
    <Card  
      key={data.id}  
      image={data.image}  
      title={data.title}  
      description={data.description}  
      subforum={<SubredditInfo iconUrl={data.iconUrl} name={data.subreddit} />}
      url="hi"  
    />  
  ));  

  return (  
    <div>  
      <Carousel cards={cards} />  
    </div>  
  );  
}
