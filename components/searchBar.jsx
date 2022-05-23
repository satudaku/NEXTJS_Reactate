import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";

import { getFilterValues } from "../utils/filterData";
import { baseUrl, fetchApi } from "../utils/fetchApi";

const SearchBar = ({ purpose: purpose }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState();
  const [loading, setLoading] = useState(false);

  const searchProperties = (filterValues) => {
    const path = `/search`;
    const { query } = router;
    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });
    router.push({ pathname: path, query: query });
  };

  useEffect(() => {
    // Search term when typing on location searchbar
    // If user typing on searchbar this trigger automatically
    if (searchTerm !== "") {
      setLoading(true);
      // Set timeout to prevent 'Too many request' error
      const timeout = setTimeout(() => {
        const fetchData = async () => {
          // Fetch any hits with the search term
          const data = await fetchApi(
            `${baseUrl}/auto-complete?query=${searchTerm}`
          );
          setLoading(false);
          setLocationData(data?.hits);
        };
        fetchData();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [searchTerm]);

  return (
    <Box rounded="2xl">
      <InputGroup>
        <Input
          placeholder="Type location here"
          value={searchTerm}
          w="600px"
          focusBorderColor="gray.300"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm !== "" && (
          <InputRightElement>
            <Icon
              as={MdCancel}
              pos="absolute"
              cursor="pointer"
              right="5"
              zIndex="101"
              onClick={() => setSearchTerm("")}
            />
          </InputRightElement>
        )}
      </InputGroup>
      {loading && <Spinner margin="auto" marginTop="3" />}
      {searchTerm && (
        <Box height="150px" overflow="auto">
          {locationData?.map((location) => (
            <Box
              width="full"
              textShadow="none"
              key={location.id}
              onClick={() => {
                searchProperties({
                  locationExternalIDs: location.externalID,
                  purpose: purpose,
                });
                setSearchTerm("");
              }}
            >
              <Text
                cursor="pointer"
                bg="gray.200"
                p="2"
                borderBottom="1px"
                borderColor="gray.100"
              >
                {location.name}
              </Text>
            </Box>
          ))}
          {!loading && !locationData?.length && (
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              marginTop="5"
              marginBottom="5"
            >
              <Text fontSize="xl" marginTop="3" textShadow="none">
                Whoops! cannot find &ldquo;{searchTerm}&rdquo; location
              </Text>
            </Flex>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
