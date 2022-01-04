import React from 'react';
import { db } from '../Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import {
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Box,
  VStack,
  Avatar,
  HStack,
  Image,
  Flex,
} from '@chakra-ui/react';
import { UserContext } from '../App.js';
import image from '../assets/images/loading.svg';

const Splash = () => {
  const { user } = React.useContext(UserContext);
  const [records, setRecords] = React.useState([]);
  const CollectionRef = collection(db, 'sleep_records');

  const userQuery = query(CollectionRef, where('user_id', '==', user.uid));

  React.useEffect(() => {
    const getRecords = async () => {
      await getDocs(userQuery).then(data => {
        setRecords(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });
    };

    getRecords();
  }, []);

  const getAvg = action => {
    if (records) {
      switch (action) {
        case 'duration':
          let avgHrs = 0;
          let avgMins = 0;
          let avg = 0;
          for (const record of records) {
            avgHrs += parseInt(record.sleep_duration.hours);
            avgMins += parseInt(record.sleep_duration.minutes);
            avg +=
              record.sleep_duration.hours + record.sleep_duration.minutes / 60;
          }
          return [
            `${parseInt(avgHrs / records.length)}H ${parseInt(
              avgMins / records.length
            )}M`,
            avg / records.length,
          ];
        case 'wake':
          let avgWakeHrs = 0;
          let avgWakeMins = 0;
          for (const record of records) {
            const timeHrs = record.wake_time.slice(0, 2);
            const timeMins = record.wake_time.slice(3, 5);
            avgWakeHrs += parseInt(timeHrs);
            avgWakeMins += parseInt(timeMins);
          }
          return `${parseInt(avgWakeHrs / records.length)}:${parseInt(
            avgWakeMins / records.length
          )}`;
        case 'sleep':
          let avgSleepHrs = 0;
          let avgSleepMins = 0;
          for (const record of records) {
            const timeHrs = record.sleep_time.slice(0, 2);
            const timeMins = record.sleep_time.slice(3, 5);
            avgSleepHrs += parseInt(timeHrs);
            avgSleepMins += parseInt(timeMins);
          }
          return `${parseInt(avgSleepHrs / records.length)}:${parseInt(
            avgSleepMins / records.length
          )}`;

        default:
          break;
      }
    }
  };

  const getNumDays = () => {
    let daysMore = 0;
    let daysLess = 0;
    let daysGood = 0;
    if (records) {
      for (const record of records) {
        const timeSlept =
          record.sleep_duration.hours + record.sleep_duration.minutes / 60;
        if (timeSlept >= 8) daysMore++;
        else if (timeSlept <= 6) daysLess++;
        else daysGood++;
      }
    }
    return [daysMore, daysLess, daysGood];
  };

  let photoURL = user.photoURL;

  const AverageBox = ({ heading, param }) => {
    return (
      <Box
        minW="170"
        maxW="200"
        borderRadius={15}
        bg="purple.200"
        p={3}
        boxShadow="md"
      >
        <VStack align="center">
          <Heading as="h4" size="sm">
            {heading}
          </Heading>
          <Heading as="h4" size="md">
            {getAvg(param)}
          </Heading>
        </VStack>
      </Box>
    );
  };

  const CountBox = ({ heading, param, color }) => {
    return (
      <Box minW="100%" borderRadius={15} bg={color} p={3} boxShadow="md">
        <Heading as="h4" size={{ base: 'sm', lg: 'md' }} align="center">
          {heading}
        </Heading>
        <Heading as="h4" size="lg" align="center">
          {getNumDays()[param]} Days(s)
        </Heading>
      </Box>
    );
  };

  return (
    <>
      {records ? (
        <Flex
          w={{ base: '60%', lg: '60%' }}
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-around"
        >
          <VStack spacing={5}>
            <Box
              boxShadow="lg"
              w={{ base: '350px', lg: '400px' }}
              borderRadius={15}
              bg="purple.200"
              p={10}
            >
              <VStack align="center">
                <CircularProgress
                  value={(getAvg('duration')[1] / 12) * 100 || 0}
                  size="250px"
                  thickness={'12px'}
                  color="purple.500"
                  capIsRound
                  trackColor="purple.100"
                >
                  {' '}
                  <CircularProgressLabel>
                    <Avatar size={'2xl'} src={photoURL} />
                  </CircularProgressLabel>
                </CircularProgress>
                <Heading as="h4" size="md">
                  AVG SLEEP DURATION
                </Heading>
                <Heading>{getAvg('duration')[0]}</Heading>
              </VStack>
            </Box>
            <HStack w={{ base: '350px', lg: '400px' }} justify="space-around">
              <AverageBox heading={'AVG WAKE TIME'} param={'wake'} />
              <AverageBox heading={'AVG SLEEP TIME'} param={'sleep'} />
            </HStack>
          </VStack>
          <VStack spacing={{ base: 5, lg: 10 }} mt={{ base: '10', lg: '0' }}>
            <CountBox
              heading={'Days Slept Between 6 and 8 Hours'}
              param={2}
              color={'green.200'}
            />
            <CountBox
              heading={'Days Slept More Than 8 hours'}
              param={0}
              color={'blue.200'}
            />
            <CountBox
              heading={'Days Slept Less Than 6 hours'}
              param={1}
              color={'red.200'}
            />
          </VStack>
        </Flex>
      ) : (
        <VStack>
          <Heading>Loading...</Heading>
          <Image src={image} maxW="75%" />
        </VStack>
      )}
    </>
  );
};

export default Splash;
