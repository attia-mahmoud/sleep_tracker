import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { FaSignOutAlt, FaBed } from 'react-icons/fa';
import { UserContext } from '../App';
import { signOutWithGoogle } from '../Firebase';
import { Icon } from '@chakra-ui/react';

const Links = ['Add Entry', 'Graph', 'Table'];

const NavLink = ({ children, href }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('purple.600', 'purple.500'),
    }}
    href={`#${href}`}
  >
    {children}
  </Link>
);

export default function Nav(props) {
  const { user } = React.useContext(UserContext);

  let photoURL = user.photoURL;

  return (
    <>
      <Box bg="purple.400" color="whiteAlpha.800" px={4} {...props}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          p={7}
        >
          <HStack spacing={8} alignItems={'center'}>
            <HStack>
              <Text fontWeight={600} fontSize={['md', 'xl']}>
                Sleep.io
              </Text>
              <Icon as={FaBed}></Icon>
            </HStack>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map(link => (
                <NavLink key={link} href={link}>
                  {link}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} src={photoURL} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={signOutWithGoogle} color="black">
                  Sign Out
                  <Icon as={FaSignOutAlt} ml={3} />
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
