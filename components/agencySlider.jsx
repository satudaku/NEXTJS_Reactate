import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { Flex, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import arrowNext from "../assets/slider/arrowNext.svg";
import arrowPrev from "../assets/slider/arrowPrev.svg";

// Agency info on the second slider
const AgencyInfo = ({ name, adsCount, adsRentCount, adsSaleCount }) => (
  <Box paddingTop="10px" justifyContent="center">
    {/* Agency name */}
    <Text
      maxWidth="900px"
      padding="2"
      fontSize="md"
      fontWeight="semibold"
      overflow="visible"
      align="center"
    >
      {name}
    </Text>
    {/* Agency ads count */}
    {adsCount === adsSaleCount && (
      <Text fontSize="xs" color="gray.500" textAlign="center">
        {adsSaleCount} Properties for Sale
      </Text>
    )}
    {adsCount === adsRentCount && (
      <Text fontSize="xs" color="gray.500" textAlign="center">
        {adsRentCount} Properties for Rent
      </Text>
    )}
    {adsSaleCount > 0 && adsRentCount > 0 && (
      <Flex>
        <Text
          px="2"
          width="50%"
          fontSize="xs"
          color="gray.500"
          textAlign="right"
        >
          {adsSaleCount} Properties for Sale
        </Text>
        <Text px="2" width="50%" fontSize="xs" color="gray.500">
          {adsRentCount} Properties for Rent
        </Text>
      </Flex>
    )}
  </Box>
);

// Previous arrow button for the slider
function PrevArrow(props) {
  const { style, onClick } = props;
  return (
    <Box
      as="button"
      zIndex={100}
      width={100}
      height={50}
      style={{
        ...style,
        position: "absolute",
        top: "25%",
        right: "100%",
      }}
      onClick={onClick}
    >
      {/* Previous arrow icon/image */}
      <Image src={arrowPrev} alt="arrowPrev" height="50" width="100" />
    </Box>
  );
}

// Next arrow button for the slider
function NextArrow(props) {
  const { style, onClick } = props;
  return (
    <Box
      as="button"
      zIndex={100}
      width={100}
      height={50}
      style={{
        ...style,
        position: "absolute",
        top: "25%",
        left: "100%",
      }}
      onClick={onClick}
    >
      {/* Next arrow icon/image */}
      <Image src={arrowNext} alt="arrowNext" height="50" width="100" />
    </Box>
  );
}

function AgencySlider({ agencyList }) {
  // Sliders state as they are referenced to each other
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();

  // Slider settings
  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "0px",
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: "progressive",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    // Set both slider to sync current slide at same ref
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);

  // Destructuring navigation state
  const { nav1, nav2 } = state;

  return (
    <Box
      maxWidth="900px"
      justifyContent="center"
      alignItems="center"
      paddingLeft="auto"
      paddingRight="auto"
    >
      {/* Slider title */}
      <Text textAlign="center" py="10" fontSize="xl" fontWeight="semibold">
        Featured Agency
      </Text>
      <Box align="center" justify="center">
        {/* First slider for agency logo */}
        <Slider
          {...settings}
          asNavFor={nav1}
          ref={(slider) => (slider2.current = slider)} // Sync with 2nd slider
        >
          {agencyList.map((agency) => (
            <Flex key={agency.id} justifyContent="space-around">
              <Flex id={agency.id} overflow="hidden" justifyContent="center">
                <Image
                  alt="property"
                  width={270}
                  height={120}
                  src={agency.logo.url}
                  objectFit="contain"
                  objectPosition="center"
                />
              </Flex>
            </Flex>
          ))}
        </Slider>
      </Box>
      <Box>
        {/* Second Slider for agency info */}
        <Slider
          dontAnimate={true}
          draggable={false}
          asNavFor={nav2}
          ref={(slider) => (slider1.current = slider)} // Sync with 1st slider
        >
          {agencyList.map((agency) => (
            <Flex key={agency.id} justifyContent="space-around">
              <AgencyInfo
                name={agency.name}
                adsCount={agency.stats.adsCount}
                adsRentCount={agency.stats.adsRentCount}
                adsSaleCount={agency.stats.adsSaleCount}
              />
            </Flex>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default AgencySlider;
