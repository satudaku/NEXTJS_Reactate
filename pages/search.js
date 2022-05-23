import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import SearchFilters from "../components/searchFilters";
import Property from "../components/property";
import noresult from "../assets/images/noresult.svg";
import { fetchApi, baseUrl } from "../utils/fetchApi";

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const [locationName, setLocationName] = useState("");
  const router = useRouter();

  function handleLocationName(name) {
    setLocationName(name);
  }

  return (
    <Box>
      <Box m="auto" bg="gray.800">
        <Box maxWidth="1280px" m="auto">
          <Flex
            borderColor="gray.200"
            p="2"
            fontWeight="semibold"
            fontSize="lg"
            justifyContent="center"
            alignItems="center"
            color="gray.100"
            zIndex="2"
          >
            <Text> Search Property By Filters</Text>
            <Icon paddingLeft="2" w="7" as={BsFilter} />
          </Flex>
          {/* TO MAKE SEARCH FILTER STICKY ON TOP */}
        </Box>
      </Box>
      <Box
        bg="gray.800"
        zIndex="100"
        sx={{
          position: "-webkit-sticky",
          /* Safari */
          position: "sticky",
          top: "0",
        }}
      >
        <Box maxWidth="1280px" m="auto">
          <SearchFilters onLocationName={handleLocationName} />
        </Box>
      </Box>
      <Box position="relative" maxWidth="1280px" m="auto">
        <Text fontSize="2xl" p="4" fontWeight="bold">
          Properties
          {router.query.purpose === "for-rent"
            ? "for rent"
            : router.query.purpose === "for-sale"
            ? "for sale"
            : ""}
          {router.query.locationExternalIDs &&
            locationName !== "" &&
            (" in ", locationName)}
        </Text>
        <Flex flexWrap="wrap">
          {properties.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </Flex>
        {properties.length === 0 && (
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            marginTop="5"
            marginBottom="5"
          >
            <Image alt="no result" src={noresult} />
            <Text fontSize="2xl" marginTop="3">
              No result found.
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "9999999";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "verified-score";
  const areaMin = query.areaMin || "0";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5001";
  const categoryExternalID = query.categoryExternalID || "1";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMin=${areaMin}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
