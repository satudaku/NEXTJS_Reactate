import { useEffect, useState } from "react";
import {
  Flex,
  Select,
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

import { filterData, getFilterValues } from "../utils/filterData";
import { baseUrl, fetchApi } from "../utils/fetchApi";

const SearchFilters = () => {
  const router = useRouter();
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState();
  const [loading, setLoading] = useState(false);

  const searchProperties = (filterValues) => {
    const path = router.pathname;
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
      // Because every key pressed it sends request
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
    <Flex
      flexWrap="wrap"
      py="1"
      justifyContent="center"
      style={{ overflow: "hidden" }}
    >
      {/* "filters" Is the array containing all property filter form filterData.js */}
      {/* And map over them to create input form */}
      {filters.map((filter) =>
        filter.queryName === "purpose" && filter.items.value === "for-sale" ? (
          filter.queryName === "rentFrequency" && null
        ) : (
          <Box
            m="1"
            bg="white"
            border="1px"
            borderRadius="sm"
            key={filter.queryName}
          >
            <Text fontSize="xs" paddingLeft="1">
              {filter.placeholder}
            </Text>
            <Select
              variant="unstyled"
              paddingLeft="1"
              w="fit-content"
              placeholder={null}
              onChange={(e) =>
                searchProperties({ [filter.queryName]: e.target.value })
              }
            >
              {filter?.items?.map((item) => (
                <option paddingLeft="1" value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
        )
      )}
      {/* Property location input component */}
      <Box m="1" paddingRight="0" bg="white" border="1px" borderRadius="sm">
        <Text fontSize="xs" paddingLeft="1">
          Property Location
        </Text>
        <InputGroup>
          <Input
            id="location-filter"
            list="location-list"
            variant="unstyled"
            paddingLeft="1"
            w="fit-content"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Empty searchbar button */}
          {searchTerm !== "" && (
            <InputRightElement height="20px">
              {/* Show spinner while fetching list of location  */}
              {loading ? (
                <Spinner margin="auto" marginTop="0" />
              ) : (
                <Icon
                  as={MdCancel}
                  pos="absolute"
                  cursor="pointer"
                  right="1"
                  zIndex="100"
                  onClick={() => setSearchTerm("")}
                />
              )}
            </InputRightElement>
          )}
        </InputGroup>
        {/* Show search result using datalist */}
        {searchTerm && (
          <>
            <Box
              maxWidth="300px"
              height="300px"
              overflow="auto"
              style={{ position: "absolute" }}
            >
              {locationData?.map((location) => (
                <Box
                  key={location.id}
                  onClick={() => {
                    searchProperties({
                      locationExternalIDs: location.externalID,
                    });
                    setSearchTerm("");
                    return location.name;
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
            </Box>
          </>
        )}

        {!loading && locationData?.length === 0 && (
          <Flex justifyContent="center" alignItems="center" my="3">
            <Text fontSize="md" marginTop="3">
              Whoops! cannot find &ldquo;{searchTerm}&rdquo; location
            </Text>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default SearchFilters;
