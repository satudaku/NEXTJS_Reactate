import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoCheck } from "react-icons/go";
import NumberFormat from "react-number-format";

import ShortLocation from "./shortLocation";
import defaultImage from "../assets/images/house.jpg";
import noImage from "../assets/images/no-image.png";

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    location,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => (
  <Link href={`/property/${externalID}`} passHref>
    <Flex
      flexWrap="wrap"
      width="410px"
      m="2"
      justifyContent="flex-start"
      cursor="pointer"
      border="1px"
      borderColor="gray.100"
      rounded="md"
      overflow="hidden"
      _hover={{ boxShadow: "dark-lg" }}
      position="relative"
    >
      {/* PROPERTY THUMBNAIL */}
      <Box>
        <Image
          src={coverPhoto ? coverPhoto.url : defaultImage}
          width={410}
          height={260}
          objectFit="cover"
          alt="house"
        />
      </Box>
      <Box p="3" w="full">
        {/* PROPERTY INFO */}
        <Flex paddingRight="2" alignItems="center">
          <Flex alignItems="center">
            {isVerified && (
              <Flex
                marginRight="1"
                px="2"
                color="white"
                backgroundColor="teal"
                rounded="full"
              >
                <Text fontSize="sm">TruCheck&trade;</Text>
                <GoCheck />
              </Flex>
            )}
          </Flex>
          <Flex
            alignItems="center"
            p="1"
            justifyContent="space-between"
            width="290px"
            color="gray.600"
          >
            <FaBed /> {rooms}
            {rooms > 1 ? " beds" : " bed"}
            <FaBath /> {baths}
            {baths > 1 ? " baths" : " bath"}
            <BsGridFill />
            <NumberFormat
              value={area}
              displayType="text"
              thousandSeparator={true}
              decimalScale="1"
              suffix=" sq.m."
            />
          </Flex>
        </Flex>
        {/* TITLE */}
        <Text
          marginTop="1"
          fontSize="lg"
          fontWeight="semibold"
          lineHeight="tight"
          isTruncated
        >
          {title}
        </Text>
        {/* PROPERTY LOCATION */}
        <Text fontSize="md" color="gray.600">
          <ShortLocation location={location} />
        </Text>
        {/* PROPERTY PRICE */}
        <Flex justifyContent="space-between">
          <Flex>
            <Text fontSize="md" marginTop="auto">
              AED
            </Text>
            <Text fontSize="xl" marginTop="auto">
              <NumberFormat
                value={price}
                displayType="text"
                thousandSeparator={true}
                suffix=" "
              />
            </Text>
            {rentFrequency && (
              <Text fontSize="md" marginTop="auto">
                /{rentFrequency}
              </Text>
            )}
          </Flex>
          {/* AGENCY LOGO */}
          <Flex>
            <Image
              src={agency.logo ? agency.logo.url : noImage}
              width={60}
              height={40}
              objectFit="contain"
              alt="agency"
              alignItems="flex-end"
            />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  </Link>
);

export default Property;
