import React from 'react';
import { Box, ChakraProvider, VStack } from '@chakra-ui/react';
import UnauthenticatedScreen from './screens/UnauthenticatedScreen';
import AuthenticatedScreen from './screens/AuthenticatedScreen';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import theme from './theme';
import Footer from './components/Footer';

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = React.useState(null);
  const [globalRecords, setGlobalRecords] = React.useState([]);
  const value = { user, setUser, globalRecords, setGlobalRecords };
  const auth = getAuth();
  onAuthStateChanged(auth, user => {
    if (user) setUser(user);
    else setUser(null);
  });

  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={value}>
        <Box bg="gray.200" minH="100vh" overflowX="hidden">
          <VStack spacing={8}>
            {user ? <AuthenticatedScreen /> : <UnauthenticatedScreen />}
            <Footer />
          </VStack>
        </Box>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
