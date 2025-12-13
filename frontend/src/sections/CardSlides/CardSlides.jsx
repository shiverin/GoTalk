import Posts from "../Posts/Posts.jsx";
import React from "react";
import Carousel from "../../components/Carousel/Carousel.jsx";
import Card from "../../components/Card/Card.jsx";

export default function CardSlides() {

  const cards = [
    <Card
      image="https://picsum.photos/300/200?random=1"
      title="Card 1"
      description="This is the first card"
      buttonText="View"
      onButtonClick={() => alert("Clicked 1")}
    />,
    <Card
      image="https://picsum.photos/300/200?random=2"
      title="Card 2"
      description="Second card description"
      buttonText="View"
      onButtonClick={() => alert("Clicked 1")}
    />,
    <Card
      image="https://picsum.photos/300/200?random=3"
      title="Card 3"
      description="Another description"
      buttonText="View"
      onButtonClick={() => alert("Clicked 1")}
    />,
    <Card
      image="https://picsum.photos/300/200?random=4"
      title="Card 4"
      description="Fourth card"
      buttonText="View"
      onButtonClick={() => alert("Clicked 1")}
    />,
    <Card
      image="https://picsum.photos/300/200?random=5"
      title="Card 5"
      description="Fifth card"
      buttonText="View"
      onButtonClick={() => alert("Clicked 1")}
    />,
    <Card
      image="https://picsum.photos/300/200?random=5"
      title="Card 6"
      description="Sixth card"
      buttonText="View"
      onButtonClick={() => alert("Clicked 1")}
    />,
  ];
    return (
    <div>
        <Carousel cards={cards} />
    </div>
    );
}
