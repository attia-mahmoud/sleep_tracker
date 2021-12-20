import React from 'react';
import { Heading, VStack, Image, Flex, Spacer, Box } from '@chakra-ui/react';
import AddEntry from '../components/AddEntry.js';
import Footer from '../components/Footer.js';
import Graph from '../components/Graph.js';
import RecordsTable from '../components/Table.js';
import Nav from '../components/Nav.js';
import Splash from '../components/Splash.js';
import Header from '../components/Header.js';

const AuthenticatedScreen = () => {

  return (
    <>
      <Nav minW="100vw" m={0} />
      <Header />
      <Splash />
      <Flex
        direction={{base: 'column', lg: 'row'}}
        justify="space-around"
        p={5}
        align="center"
      >
        <Graph />
        <Box h="50px" />
        <RecordsTable />
      </Flex>
      <Footer />
    </>
  );
};

export default AuthenticatedScreen;
