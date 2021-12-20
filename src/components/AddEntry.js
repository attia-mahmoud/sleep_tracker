import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  Stack,
  Button,
  ButtonGroup,
  VStack,
  Collapse,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { db } from '../Firebase';
import { addDoc, collection } from 'firebase/firestore';
import { UserContext } from '../App.js';
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';

const AddEntry = () => {
  const { user } = React.useContext(UserContext);
  const { isOpen, onToggle } = useDisclosure();
  const [data, setData] = React.useState({
    date: null,
    wakeTime: null,
    sleepTime: null,
  });

  const calcDif = () => {
    if (!data.sleepTime | !data.wakeTime) {
      return;
    }
    const timeStart = new Date('01/01/2007 ' + data.sleepTime);
    const timeEnd = new Date('01/01/2007 ' + data.wakeTime);
    const hours = parseInt(
      (Math.abs(timeEnd - timeStart) / (1000 * 60 * 60)) % 24
    );
    const minutes = parseInt(
      (Math.abs(timeEnd.getTime() - timeStart.getTime()) / (1000 * 60)) % 60
    );

    return { hours, minutes };
  };

  const CollectionRef = collection(db, 'sleep_records');
  const addEntry = async () => {
    await addDoc(CollectionRef, {
      user_id: user.uid,
      sleep_time: data.sleepTime,
      wake_time: data.wakeTime,
      date: data.date,
      sleep_duration: calcDif(),
    });
    onToggle();
  };

  return (
    <>
      <VStack minW="30%" id="Add Entry">
        <Button
          onClick={onToggle}
          size="lg"
          colorScheme="purple"
          fontSize="1.5rem"
          bg="purple.400"
          iconSpacing="3"
          rightIcon={<AddIcon />}
        >
          Add Entry
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <VStack spacing={10} color="purple">
            <FormControl id="date" borderColor="purple">
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                onChange={event =>
                  setData({ ...data, date: event.target.value })
                }
              />
            </FormControl>
            <FormControl id="sleep-time" borderColor="purple">
              <FormLabel>Sleep Time</FormLabel>
              <Input
                type="time"
                onChange={event =>
                  setData({ ...data, sleepTime: event.target.value })
                }
              />
            </FormControl>
            <FormControl id="wake-time" borderColor="purple">
              <FormLabel>Wake Up Time</FormLabel>
              <Input
                type="time"
                onChange={event =>
                  setData({ ...data, wakeTime: event.target.value })
                }
              />
            </FormControl>
            <Stack spacing={4} direction="row" align="center">
              <Button colorScheme="red"  variant="solid" onClick={onToggle}>
                Cancel
              </Button>
              <Button colorScheme="blue" variant="solid">
                Reset
              </Button>
              <Button colorScheme="green" variant="solid" onClick={addEntry}>
                Submit
              </Button>
            </Stack>
          </VStack>
        </Collapse>
      </VStack>
    </>
  );
};

export default AddEntry;
