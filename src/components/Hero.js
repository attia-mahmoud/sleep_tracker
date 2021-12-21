import React from 'react';
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  Badge,
  Input,
  VisuallyHidden,
  SimpleGrid,
  Button,
  InputGroup,
  InputRightElement,
  Image,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import image1 from '../assets/images/graph.svg';
import image2 from '../assets/images/wake.svg';
import HeroSignIn from './HeroSignIn';

const Hero = () => {
  return (
    <>
      <VStack color="purple.600">
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={0}
          _after={{
            bg: 'brand.500',
            opacity: 0.25,
            pos: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1,
            content: '" "',
          }}
          mb={{ lg: 20, base: 0 }}
        >
          <Flex
            direction="column"
            alignItems="start"
            justifyContent="center"
            px={{ base: 0, lg: 20 }}
            py={{ base: 10, lg: 24 }}
            order={{ base: '1', lg: '0' }}
          >
            <chakra.h1
              mb={6}
              fontSize={{ base: '4xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              lineHeight="shorter"
            >
              Visualize Your Sleeping Patterns
            </chakra.h1>

            <chakra.p
              pr={{ base: 0, lg: 16 }}
              mb={4}
              fontSize="md"
              letterSpacing="wider"
            >
              Discovering how your sleep changes from day to day is the first
              step to fixing your sleep schedule.
            </chakra.p>
          </Flex>
          <Box>
            <Image
              src={image1}
              w="full"
              h={{ base: 64, md: 'full' }}
              loading="lazy"
            />
          </Box>
        </SimpleGrid>
        {/* Hero #2 */}
        <Spacer />
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={0}
          _after={{
            bg: 'brand.500',
            opacity: 0.25,
            pos: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1,
            content: '" "',
          }}
          mb={20}
        >
          <Box>
            <Image
              src={image2}
              w="full"
              h={{ base: 64, md: 'full' }}
              loading="lazy"
            />
          </Box>
          <Flex
            direction="column"
            alignItems="start"
            justifyContent="center"
            px={{ base: 0, lg: 20 }}
            py={{ base: 10, lg: 24 }}
            order={{ base: '1', lg: '0' }}
          >
            <chakra.h1
              mb={6}
              fontSize={{ base: '4xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              lineHeight="shorter"
            >
              Get Up Refreshed in the Morning
            </chakra.h1>

            <chakra.p
              pr={{ base: 0, lg: 16 }}
              mb={4}
              fontSize="md"
              letterSpacing="wider"
            >
              Start your day off on the right side of the bed and get ready to
              meet your most productive self.
            </chakra.p>
          </Flex>
        </SimpleGrid>
        <HeroSignIn />
      </VStack>
    </>
  );
};

export default Hero;
