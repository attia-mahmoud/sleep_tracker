import React from 'react';
import { Heading, VStack, Image, Flex, Spacer, Box } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Footer from '../components/Footer.js';
import Graph from '../components/Graph.js';
import RecordsTable from '../components/Table.js';
import Nav from '../components/Nav.js';
import Splash from '../components/Splash.js';
import Header from '../components/Header.js';
import AddEntry from '../components/AddEntry';
import { UserContext } from '../App.js';

const AuthenticatedScreen = () => {
  const { user } = React.useContext(UserContext);

  const [count, setCount] = React.useState(0)

  function forceUpdate() {
      setCount(count => count + 1)
  }

  return (
    <>
      <Nav minW="100vw" m={0} />
      <Header text={`Hello ${user?.displayName}! 👋`}>
        <AddEntry onClick={forceUpdate}/>
      </Header>
      <Header text={'View Your Dashboard'} />
      <Splash />

      <Header text={'Visualize Your Sleeping Patterns'} />
      <Tabs
        isFitted
        variant="soft-rounded"
        colorScheme="purple"
        align="center"
        p={10}
      >
        <TabList maxW="70%" mb="1em">
          <Tab>Graph</Tab>
          <Tab>Table</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Graph />
          </TabPanel>
          <TabPanel>
            <RecordsTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default AuthenticatedScreen;
