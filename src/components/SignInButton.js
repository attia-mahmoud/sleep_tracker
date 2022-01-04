import React from 'react';
import { Button } from '@chakra-ui/react';
import { signInWithGoogle } from '../Firebase';
import { UserContext } from '../App.js';
import { FaGoogle } from 'react-icons/fa';

const SignInButton = () => {
  let { setUser } = React.useContext(UserContext);
  const SignIn = () => {
    signInWithGoogle()
      .then(result => {
        setUser(result.user);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Code: ${errorCode} - Message: ${errorMessage}`);
      });
  };

  return (
    <Button
      onClick={SignIn}
      leftIcon={<FaGoogle />}
      colorScheme="purple"
      size="lg"
    >
      Sign in with Google
    </Button>
  );
};

export default SignInButton;
