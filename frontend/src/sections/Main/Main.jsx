import Content from "../Content/Content.jsx";
import React from "react";
import CardSlides from "../CardSlides/CardSlides.jsx";

export default function Main() {
    return (

    <div className="h-full pl-16 pr-16"  >
      <div className="">
        <CardSlides/>
        <Content />
      </div>
    </div>
    );
}
