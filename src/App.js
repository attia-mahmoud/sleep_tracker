import React from 'react';
import { Box, ChakraProvider, VStack } from '@chakra-ui/react';
import UnauthenticatedScreen from './screens/UnauthenticatedScreen';
import AuthenticatedScreen from './screens/AuthenticatedScreen';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import Fonts from './fonts';
import theme from './theme';

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = React.useState(null);

  const value = { user, setUser };
  const auth = getAuth();
  onAuthStateChanged(auth, user => {
    if (user) setUser(user);
    else setUser(null);
  });

  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={value}>
        <Box bg="purple.200" minH="100vh">
          <VStack spacing={8}>
            {user ? <AuthenticatedScreen /> : <UnauthenticatedScreen />}
          </VStack>
        </Box>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
