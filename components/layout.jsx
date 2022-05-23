import Head from "next/head";
import { Box } from "@chakra-ui/react";

import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Real Reactate</title>
    </Head>
    <Box m="auto" minHeight="calc(100vh - 201px)">
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </Box>
  </>
);

export default Layout;
