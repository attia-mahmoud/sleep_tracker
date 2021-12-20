import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube, FaBed } from 'react-icons/fa';
import { ExternalLinkIcon } from '@chakra-ui/icons';



const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg="purple.900"
      color="whiteAlpha.900"
      minW="100%"
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <HStack>
          <Text fontWeight={600} fontSize={['md', 'xl']}>
            Sleep.io
          </Text>
          <Icon as={FaBed}></Icon>
        </HStack>
        <Text>
          <Link href="https://mahmoudattia.com" isExternal>
            Built by Mahmoud <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
      </Container>
    </Box>
  );
}
