import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  Spacer,
  Heading,
  VStack,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { FaGoogle, FaAngleDoubleDown } from 'react-icons/fa';
import SignInButton from '../components/SignInButton';

import image from '../assets/images/sleep_analysis.svg';
import Hero from '../components/Hero';

const UnauthenticatedScreen = () => {
  return (
    <>
      <VStack mt={20} minH={{ base: '80vh', lg: '100vh' }} color="purple.600">
        <Heading
          as="h1"
          fontSize={['3rem', '6rem']}
          textAlign="center"
          fontStyle="heading"
        >
          Sleep.io
        </Heading>
        <Flex
          minH="60vh"
          maxW="90%"
          justify="space-around"
          align="center"
          direction={['column', null, 'row']}
          spacing={10}
        >
          <Image src={image} objectFit="fit" boxSize={['90%', '80%', '40%']} />
          <VStack spacing={10} maxW="100%" textAlign="center" ml="3" mr="3">
            <Heading as="h3" size="lg">
              Start keeping track of your sleep today!
            </Heading>
            <SignInButton />
          </VStack>
        </Flex>
        <VStack textAlign="center" cursor="pointer">
          <Text>Learn More</Text>
          <Icon as={FaAngleDoubleDown} />
        </VStack>
      </VStack>
      <VStack maxW="80%">
        <Hero />
      </VStack>
    </>
  );
};

export default UnauthenticatedScreen;
