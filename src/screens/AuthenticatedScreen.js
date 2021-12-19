import { Heading, VStack, Image, Flex, Spacer, Box } from '@chakra-ui/react';
import React from 'react';
import { UserContext } from '../App.js';
import AddEntry from '../components/AddEntry.js';
import Footer from '../components/Footer.js';
import Graph from '../components/Graph.js';
import RecordsTable from '../components/Table.js';
import Nav from '../components/Nav.js';
import Splash from '../components/Splash.js';
import image from '../assets/images/loading.svg';

const AuthenticatedScreen = () => {
  const { user } = React.useContext(UserContext);

  const [loading, setLoading] = React.useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
      <Nav minW="100vw" m={0} />
      <Heading size="xl" maxW="80%" textAlign={'center'}>
        Good Morning {user?.displayName}!
      </Heading>
      {loading ? (
        <VStack>
          <Heading>Loading...</Heading>
          <Image src={image} maxW="75%" />
        </VStack>
      ) : (
        <>
          <Splash />
          <AddEntry />
          <Flex
            direction={['column', 'row']}
            justify="space-between"
            align="center"
            minW="70%"
            maxW="90%"
            minH="150%"
            m={5}
            p={5}
          >
            <Graph />
            <Box h="50px" />
            <RecordsTable />
          </Flex>
          <Footer />
        </>
      )}
    </>
  );
};

export default AuthenticatedScreen;
