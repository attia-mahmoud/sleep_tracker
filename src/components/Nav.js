import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaSignOutAlt, FaBed } from 'react-icons/fa';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { UserContext } from '../App';
import { signOutWithGoogle } from '../Firebase';
import { Icon } from '@chakra-ui/react';

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

export default function Nav(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = React.useContext(UserContext);

  let photoURL = user.photoURL;

  return (
    <>
      <Box bg="purple.700" color="whiteAlpha.800" px={4} {...props}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
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
                <NavLink key={link}>{link}</NavLink>
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
                <MenuItem onClick={signOutWithGoogle}>
                  Sign Out
                  <Icon as={FaSignOutAlt} ml={3} />
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
