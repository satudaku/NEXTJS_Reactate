import { Box, Text } from "@chakra-ui/react";

import React from "react";

const Footer = () => (
  <Box
    m="auto"
    p="5"
    height="100px"
    marginTop="40px"
    textAlign="center"
    borderTop="1px"
    borderColor="gray.100"
    bgColor="gray.800"
  >
    <Text size="sm" color="white">
      2022 Daiki Sato Reactate, Inc. All Right Reserved
    </Text>
    <Text size="sm" color="white">
      Powered by <span style={{ fontWeight: "700", color: "teal" }}>bayut</span>{" "}
      API
    </Text>
  </Box>
);

export default Footer;
