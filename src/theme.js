import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

let theme = extendTheme({
  colors: {
    brand: {
      100: '#f7fafc',
      // ...
      900: '#1a202c',
    },
    fonts: {
      heading: 'Heading Quesha',
      body: 'Body Quesha',
    },
  },
  config,
});

export default theme;
