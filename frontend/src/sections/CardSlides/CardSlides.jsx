import React from "react";  
import Carousel from "../../components/Carousel/Carousel.jsx";  
import Card from "../../components/Card/Card.jsx";  
import { FaQuestion } from "react-icons/fa"; // fallback icon

// ---------------- TOP-LEVEL CONSTANTS ----------------
const randomIconUrl = (seed) =>
  `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;

const cardData = [
  {
    id: 1,
    image: "https://picsum.photos/300/200?random=1",
    title: "Exploring the Alps",
    description: "A stunning view of the mountains during sunrise.",
    subreddit: "r/travel",
    iconUrl: randomIconUrl("travel"),
  },
  {
    id: 2,
    image: "https://picsum.photos/300/200?random=2",
    title: "New M2 Max Review",
    description: "A deep dive into performance benchmarks.",
    subreddit: "r/technology",
    iconUrl: randomIconUrl("technology"),
  },
  {
    id: 3,
    image: "https://picsum.photos/300/200?random=3",
    title: "Cozy Reading Nook",
    description: "My happy place for weekend reading.",
    subreddit: "r/CozyPlaces",
    iconUrl: randomIconUrl("CozyPlaces"),
  },
  {
    id: 4,
    image: "https://picsum.photos/300/200?random=4",
    title: "Homemade Sourdough",
    description: "Finally achieved a good oven spring!",
    subreddit: "r/baking",
    iconUrl: randomIconUrl("baking"),
  },
  {
    id: 5,
    image: "https://picsum.photos/300/200?random=5",
    title: "Minimalist Desk Setup",
    description: "Clean and simple productivity setup.",
    subreddit: "r/battlestations",
    iconUrl: randomIconUrl("battlestations"),
  },
  {
    id: 6,
    image: "https://picsum.photos/300/200?random=6",
    title: "Stray Cat Finds a Home",
    description: "Now he's part of the family.",
    subreddit: "r/aww",
    iconUrl: randomIconUrl("aww"),
  }
];

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
