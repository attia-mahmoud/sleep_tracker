import React from 'react'
import { Heading, VStack, HStack, Image, Flex, Spacer, Box } from '@chakra-ui/react';
import { UserContext } from '../App.js';
import AddEntry  from './AddEntry.js';


const Header = () => {
    const { user } = React.useContext(UserContext);

    return (
        <>
        <Flex justify="space-between" w={{base: "90%",lg: "80%"}}  p={5}  direction={{base: 'column', lg: 'row'}} align="center">
            <Heading size="xl" maxW="80%" textAlign={'center'} color="purple.700" mb={{base: "10", lg: "0"}}>
                Hello {user?.displayName}! 👋
            </Heading>
            <AddEntry />
        </Flex>

      </>
    )
}

export default Header