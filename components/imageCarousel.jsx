import Image from "next/image";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = ({ photos }) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      showThumbs={true}
      dynamicHeight={true}
    >
      {photos.map((photo) => (
        <div key={photo.id} width="910px" height="600px" overflow="hidden">
          {/* Using html img to display image because next/image is not compatible */}
          <img alt="property" src={photo.url} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
