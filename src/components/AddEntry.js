import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  VStack,
  Collapse,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { db } from '../Firebase';
import { addDoc, collection } from 'firebase/firestore';
import { UserContext } from '../App.js';
import { AddIcon } from '@chakra-ui/icons';
import { calcDif } from '../utils/utils';

const AddEntry = ({ onClick }) => {
  const { user, setGlobalRecords } = React.useContext(UserContext);
  const { isOpen, onToggle } = useDisclosure();
  const [data, setData] = React.useState({
    date: null,
    wakeTime: null,
    sleepTime: null,
  });

  const CollectionRef = collection(db, 'sleep_records');

  const addEntry = async () => {
    const entry = {
      user_id: user.uid,
      sleep_time: data.sleepTime,
      wake_time: data.wakeTime,
      date: data.date,
      sleep_duration: calcDif(data),
    };
    await addDoc(CollectionRef, entry);
    setGlobalRecords(prevState => prevState.push(entry));
    onToggle();
  };

  return (
    <>
      <VStack minW="30%" id="Add Entry" mt={{ base: '10', lg: '0' }}>
        <Button
          onClick={onToggle}
          size="lg"
          fontSize="1.5rem"
          colorScheme="purple"
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
              <Button colorScheme="red" variant="ghost" onClick={onToggle}>
                Cancel
              </Button>
              <Button colorScheme="blue" variant="outline">
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
