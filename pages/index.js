import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Flex,
  Box,
  Center,
  Text,
  Button,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import AgencySlider from "../components/agencySlider";
import SearchBar from "../components/searchBar";
import Property from "../components/property";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import forRent from "../assets/images/for-rent.jpg";
import forSale from "../assets/images/for-sale.jpg";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}) => (
  <Center flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Box overflow="hidden">
      <Image src={imageUrl} width={500} height={300} alt="banner" />
    </Box>
    <Box p="5">
      <Text color="grey.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text color="grey.700" fontSize="lg" paddingTop="3" paddingBottom="3">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="xl" color="teal.400">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Center>
);

export default function Home({
  propertiesForSale,
  propertiesForRent,
  agencyList,
}) {
  const [searchPurpose, setSearchPurpose] = useState("for-rent");
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
    if (tabIndex < 1) {
      return setSearchPurpose("for-sale");
    }
    return setSearchPurpose("for-rent");
  };

  return (
    <Box maxWidth="1280px" m="auto">
      <Box
        mx="2"
        height="500px"
        background="tomato"
        backgroundImage="
        linear-gradient(
          rgba(0, 0, 0, 0.7), 
          rgba(0, 0, 0, 0.7)
        ),
        url('https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_960_720.jpg')"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="50%"
        opacity="0.8"
        rounded="xl"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          paddingTop="90"
          flexDirection="column"
          textShadow="2px 2px #000"
        >
          <Text variant="h1" fontSize="3xl" fontWeight="bold" color="gray.100">
            Your Dream Home Starts Here
          </Text>
          <Text
            variant="subtitle1"
            fontSize="xl"
            color="gray.200"
            marginBottom="50"
            textShadow="2px 2px #000"
          >
            The Number 1 Real Estate Website to Rent and for Sale Properties in
            UAE
          </Text>
          <Tabs
            size="lg"
            background="gray.50"
            colorScheme="teal"
            textColor="gray.600"
            index={tabIndex}
            onChange={handleTabsChange}
            isFitted
            rounded="md"
          >
            <TabList>
              <Tab fontWeight="bold">Rent a Property</Tab>
              <Tab fontWeight="bold">Buy a Property</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SearchBar purpose={searchPurpose} />
              </TabPanel>
              <TabPanel>
                <SearchBar purpose={searchPurpose} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
      <Banner
        purpose="For Rent"
        title1="Rental homes for"
        title2="Everyone"
        desc1="Explore apartments, villas, and homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl={forRent}
      />
      {/* Fetch the properties and map over them */}
      <Flex flexWrap="wrap" alignItems="center" justify="center">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Divider orientation="horizontal" marginTop="20px" />
      <Banner
        purpose="Buy A HOME"
        title1="Find, Buy, & Own"
        title2="Dream Home"
        desc1="Explore apartments, villas, and homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl={forSale}
      />
      <Flex flexWrap="wrap" alignItems="center" justify="center">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Divider orientation="horizontal" marginTop="20px" />
      <Center>
        <AgencySlider agencyList={agencyList} />
      </Center>
    </Box>
  );
}

export async function getStaticProps() {
  //Fetch explore more property constant
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5001&purpose=for-sale&hitsPerPage=6&sort=verified-score`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5001&purpose=for-rent&hitsPerPage=6&sort=verified-score`
  );
  //Fetch random agencies with key: "property real"
  const agencyList = await fetchApi(
    `${baseUrl}/agencies/list?hitsPerPage=10&page=0&query=properties%20real`
  );
  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
      agencyList: agencyList?.hits,
    },
  };
}
