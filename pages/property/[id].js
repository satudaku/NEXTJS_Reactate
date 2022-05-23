import Link from "next/link";
import { Box, Flex, Center, Divider, Text, Image } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoCheck } from "react-icons/go";
import NumberFormat from "react-number-format";
import Interweave from "interweave";

import { baseUrl, fetchApi } from "../../utils/fetchApi";
import ImageCarousel from "../../components/imageCarousel";
import LongLocation from "../../components/longLocation";
import noImage from "../../assets/images/no-image.png";

// Useful links on the side
const UsefulLinks = ({ href, title }) => (
  <>
    <Link href={href} passHref>
      {title}
    </Link>
    <br />
  </>
);

const InfoProperty = ({ label, value1, value2 }) => (
  <Flex w="325px" borderBottom="1px" borderColor="gray.100" p="3">
    <Text width="115px" fontSize="sm">
      {label}
    </Text>
    <Text textAlign="left" fontWeight="semibold" fontSize="sm">
      {value1}
      {value2}
    </Text>
  </Flex>
);

const InfoDate = ({ label, value1 }) => (
  <Flex w="325px" borderBottom="1px" borderColor="gray.100" p="3">
    <Text width="115px" fontSize="sm">
      {label}
    </Text>
    <Text textAlign="left" fontWeight="semibold" fontSize="sm">
      {value1.toLocaleDateString("en-AU")}
    </Text>
  </Flex>
);

const PropertyDetails = ({
  propertyDetails: {
    externalID,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    permitNumber,
    contactName,
    phoneNumber,
    isVerified,
    location,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
    referenceNumber,
    verification,
    reactivatedAt,
  },
}) => (
  <Box maxWidth="1280px" m="auto">
    <Flex>
      {/* Property's Details */}
      <Box width="73%" marginRight="auto" p="0">
        {/* PROPERTY's IMAGES */}
        <Box m="3" backgroundColor="gray.800">
          {photos && <ImageCarousel photos={photos} />}
        </Box>
        <Box w="full" px="6" paddingBottom="6">
          {/* PRICE & TRUCHECK LINE */}
          <Flex marginBottom="2" alignItems="center">
            <Flex>
              <Text fontSize="lg" marginTop="auto">
                AED
              </Text>
              <Text fontSize="2xl" fontWeight="semibold" marginTop="auto">
                <NumberFormat
                  value={price}
                  displayType="text"
                  thousandSeparator={true}
                  suffix=" "
                />
              </Text>
              {rentFrequency && (
                <Text fontSize="lg" marginTop="auto">
                  /{rentFrequency}
                </Text>
              )}
            </Flex>
            {isVerified && (
              <Flex
                marginLeft="2"
                px="2"
                color="white"
                backgroundColor="teal.400"
                rounded="full"
              >
                <Text fontSize="md">TruCheck&trade;</Text>
                <GoCheck />
              </Flex>
            )}
          </Flex>

          {/* Location LINE */}
          <Flex as="em" py="2" fontSize="lg">
            <LongLocation location={location} />
          </Flex>

          {/* BEDS, BATHS, & AREA */}
          <Flex
            py="2"
            alignItems="center"
            justifyContent="space-between"
            w="460px"
            color="teal.400"
            fontSize="xl"
          >
            <FaBed /> {rooms}
            {rooms > 1 ? " bedrooms" : " bedroom"}
            <FaBath /> {baths}
            {baths > 1 ? " bathrooms" : " bathroom"}
            <BsGridFill />
            <NumberFormat
              value={area}
              displayType="text"
              thousandSeparator={true}
              decimalScale="1"
              suffix=" sq.m."
            />
          </Flex>

          {/* TITLE & DESCRIPTION */}
          <Box my="5">
            <Text fontSize="xl" marginBottom="4" fontWeight="semibold">
              {title}
            </Text>
            <Text fontSize="sm" lineHeight="1.2" color="gray.600">
              <Interweave content={description} />
            </Text>
          </Box>

          {/* PROPERTY INFO */}
          <Flex flexWrap="wrap" justifyContent="space-between" width="80%">
            <InfoProperty label="Type" value1={type} />
            {purpose === "for-sale" ? (
              <InfoProperty label="Purpose" value1="for sale" />
            ) : (
              <InfoProperty label="Purpose" value1="for rent" />
            )}
            {furnishingStatus && (
              <InfoProperty label="Furnishing" value1={furnishingStatus} />
            )}
            <InfoProperty
              label="Reference no."
              value1="Reactate - "
              value2={referenceNumber ? referenceNumber : externalID}
            />
            {verification.eligible && (
              <InfoDate
                label="TruCheck&trade; on"
                value1={new Date(`${verification.updatedAt}` * 1000)}
              />
            )}
            <InfoDate
              label="Added on"
              value1={new Date(reactivatedAt * 1000)}
            />
          </Flex>

          {/* AMENITIES */}
          <Box>
            {amenities.length ? (
              <Text fontSize="xl" fontWeight="bold" marginTop="5">
                Facilities:
              </Text>
            ) : null}
            <Flex flexWrap="wrap" marginTop="10px">
              {amenities?.map((item) =>
                item?.amenities?.map((amenity) => (
                  <Text
                    fontWeight="semibold"
                    color="teal.400"
                    fontSize="l"
                    p="2"
                    bg="gray.200"
                    m="1"
                    borderRadius="5"
                    key={amenity.text}
                  >
                    {amenity.text}
                  </Text>
                ))
              )}
            </Flex>
          </Box>
        </Box>
      </Box>
      <Divider orientation="vertical" my="20px" />

      {/* AGENCY CONTACT DETAILS */}
      <Box width="25%" float="right">
        {/* TO MAKE THE SIDE BAR STICKY */}
        <Box
          sx={{
            position: "-webkit-sticky",
            /* Safari */
            position: "sticky",
            top: "0",
          }}
        >
          {/* Agency logo */}
          <Flex
            width="full"
            justifyContent="center"
            padding="15px"
            marginTop="3"
          >
            <Image
              height="150px"
              alt="agency"
              src={agency.logo ? agency.logo.url : noImage}
              objectFit="contain"
              align="center"
            />
          </Flex>
          {/* Agency info */}
          <Center display="block">
            <Text fontSize="md" fontWeight="semibold" align="center">
              {agency.name}
            </Text>
            {agency.licenses.map((license, i) => (
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="gray.500"
                align="center"
                key={i}
              >
                {license.authority}# {license.number}
              </Text>
            ))}
            {permitNumber && (
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="gray.500"
                align="center"
              >
                Permit# {permitNumber}
              </Text>
            )}
          </Center>

          <Divider mx="5px" py="10px" />
          {/* Contact us */}
          <Box paddingTop="10px">
            <Text as="em" fontSize="lg" paddingBottom="10px">
              Interested in the property? Wanted more information?
            </Text>
            <br />
            <Text as="em" fontSize="md" paddingBottom="10px">
              Contact us
            </Text>
            {contactName && (
              <Text fontSize="md" fontWeight="semibold">
                Agent: {contactName}
              </Text>
            )}
            {phoneNumber.mobile && (
              <Text fontSize="md">
                Mobile:{" "}
                {phoneNumber.mobile.substr(0, phoneNumber.mobile.length - 4) +
                  "****"}
              </Text>
            )}
            {phoneNumber.phone && (
              <Text fontSize="md">
                Phone:{" "}
                {phoneNumber.phone.substr(0, phoneNumber.phone.length - 4) +
                  "****"}
              </Text>
            )}
            <Text fontSize="sm" fontWeight="semibold" color="gray.300">
              Phone number redacted for privacy reason
            </Text>
            <Divider mx="5px" py="10px" />
            <Text paddingTop="10px" fontSize="md" align="center">
              Please quote property reference
            </Text>
            {referenceNumber ? (
              <Text fontSize="md" fontWeight="semibold" align="center">
                Reactate - {referenceNumber}
              </Text>
            ) : (
              <Text fontSize="md" fontWeight="semibold" align="center">
                Reactate - {externalID}
              </Text>
            )}
            <Text fontSize="md" align="center">
              when calling us
            </Text>
          </Box>
          {/* USEFUL LINKS */}
          <Box>
            <Box marginTop="15px" paddingBottom="5px" bgColor="gray.200">
              <Text
                paddingTop="10px"
                paddingLeft="10px"
                fontWeight="semibold"
                color="gray.600"
              >
                Useful links
              </Text>
            </Box>
            <Text
              marginTop="10px"
              fontSize="sm"
              color="teal.400"
              lineHeight={2}
            >
              <UsefulLinks
                href="/search?purpose=for-sale&locationExternalIDs=5002"
                title="Properties for sale in Dubai"
              />
              <UsefulLinks
                href="/search?purpose=for-sale&locationExternalIDs=5002&categoryExternalID=4&roomsMin=2"
                title="2 Bedrooms apartments for sale in Dubai"
              />
              <UsefulLinks
                href="/search?purpose=for-sale&categoryExternalID=3&roomsMin=4&locationExternalIDs=5002"
                title="4 Bedrooms villas for sale in Dubai"
              />
              <UsefulLinks
                href="/search?purpose=for-rent&locationExternalIDs=6020"
                title="Properties for rent in Abu Dhabi"
              />
              <UsefulLinks
                href="/search?purpose=for-rent&categoryExternalID=4&roomsMin=2&locationExternalIDs=6020"
                title="2 Bedrooms apartments for rent in Abu Dhabi"
              />
              <UsefulLinks
                href="/search?purpose=for-rent&categoryExternalID=16&roomsMin=4&locationExternalIDs=6020"
                title="4 Bedrooms townhouse for rent in Abu Dhabi"
              />
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  </Box>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
