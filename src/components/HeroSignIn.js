import React from 'react';
import {
  chakra,
  Box,
  useColorModeValue,
  Icon,
  Image,
  HStack,
  Stack,
} from '@chakra-ui/react';
import SignInButton from './SignInButton';

const HeroSignIn = () => {
  return (
    <Box pos="relative" overflow="hidden">
      <Box maxW="7xl" mx="auto">
        <Box
          pos="relative"
          pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
          w="full"
          border="solid 1px transparent"
        >
          <Box
            mx="auto"
            maxW={{ base: '7xl' }}
            px={{ base: 4, sm: 6, lg: 8 }}
            mt={{ base: 12, md: 16, lg: 20, xl: 28 }}
          >
            <Box
              textAlign="center"
              w={{ base: 'full', md: 11 / 12, xl: 8 / 12 }}
              mx="auto"
            >
              <chakra.h1
                fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
                letterSpacing="tight"
                lineHeight="short"
                fontWeight="extrabold"
                color={useColorModeValue('gray.900', 'white')}
                mb={12}
              >
                <chakra.span display={{ base: 'block', xl: 'inline' }}>
                  Changing Your Life Starts With a Click
                </chakra.span>
              </chakra.h1>
              <Stack
                direction={{ base: 'column', sm: 'column', md: 'row' }}
                mb={{ base: 4, md: 8 }}
                spacing={{ base: 4, md: 2 }}
                justifyContent="center"
              >
                <SignInButton />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSignIn;
