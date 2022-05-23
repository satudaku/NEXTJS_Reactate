import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";

const Navbar = () => (
  <Flex p="2" maxWidth="1280px" m="auto">
    <Box fontSize="3xl" color="teal.400" fontWeight="bold">
      <Link href="/" paddingLeft="2">
        Reactate
      </Link>
    </Box>
    <Spacer />
    <Box>
      <Menu direction="rtl">
        <MenuButton
          as={IconButton}
          aria-label="options"
          icon={<FcMenu />}
          variant="outlined"
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          color="teal.400"
          _hover={{ bg: "gray.400" }}
          _expanded={{ bg: "gray.200" }}
          _focus={{ boxShadow: "outline" }}
        />
        <MenuList zIndex="1000">
          <Link href="/" passHref>
            <MenuItem icon={<FcHome />}>Home</MenuItem>
          </Link>
          <Link href="/search" passHref>
            <MenuItem icon={<BsSearch />}>Search</MenuItem>
          </Link>
          <Link href="/about" passHref>
            <MenuItem icon={<FcAbout />}>About</MenuItem>
          </Link>
          <Link href="/search?purpose=for-sale" passHref>
            <MenuItem icon={<FiKey />}>Buy Property</MenuItem>
          </Link>
          <Link href="/search?purpose=for-rent" passHref>
            <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  </Flex>
);

export default Navbar;
