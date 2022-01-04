import React from 'react';
import { Heading, Flex } from '@chakra-ui/react';

const Header = ({ children, text }) => {
  return (
    <>
      <Flex
        justify="space-between"
        w={{ base: '100%', lg: '80%' }}
        p={5}
        direction={{ base: 'column', lg: 'row' }}
        align="center"
      >
        <Heading size="xl" maxW="80%" textAlign={'center'} color="purple.700">
          {text}
        </Heading>
        {children}
      </Flex>
    </>
  );
};

export default Header;
