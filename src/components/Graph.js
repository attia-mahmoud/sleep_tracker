import React from 'react';
import { db } from '../Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import '../assets/styles/style.css';
import {
  FlexibleXYPlot,
  XYPlot,
  LineSeries,
  LineMarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  VerticalBarSeries,
  Highlight,
} from 'react-vis';
import { Box, VStack, Image, Heading } from '@chakra-ui/react';
import { UserContext } from '../App.js';
import image from '../assets/images/loading.svg';

const Graph = () => {
  const { user } = React.useContext(UserContext);
  const [records, setRecords] = React.useState([]);
  const CollectionRef = collection(db, 'sleep_records');

  const userQuery = query(CollectionRef, where('user_id', '==', user.uid));
  React.useEffect(() => {
    const getRecords = async () => {
      await getDocs(userQuery).then(data => {
        const result = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        const sortedArr = result.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        setRecords(sortedArr);
      });
    };

    getRecords();
  }, []);

  const data = [];
  if (records) {
    for (const record of records) {
      data.push({
        x: new Date(record.date),
        y: record.sleep_duration.hours + record.sleep_duration.minutes / 60,
      });
    }
  }

  return (
    <>
      {records ? (
        <Box
          p={{ base: 5, lg: 10 }}
          id="Graph"
          // bg="purple.300"
          borderRadius={15}
          // boxSize={['350px', '500px' ]}
          boxSize={{ base: '24rem', lg: '30rem' }}
        >
          <FlexibleXYPlot xType="time" stroke="purple">
            <HorizontalGridLines />
            <XAxis
              tickFormat={value =>
                new Date(value).toLocaleDateString().split(' ')
              }
              title="Date"
              style={{
                line: { stroke: 'purple' },
                ticks: { stroke: '#ADDDE1' },
                text: {
                  stroke: 'none',
                  fill: 'purple',
                  fontWeight: 600,
                  fontSize: 11,
                },
                title: { fill: 'purple', fontSize: 15 },
              }}
              tickLabelAngle={-30}
              tickTotal={7}
            />
            <YAxis
              title="Sleep Duration (hrs)"
              style={{
                line: { stroke: 'purple' },
                ticks: { stroke: '#ADDDE1' },
                text: {
                  stroke: 'none',
                  fill: 'purple',
                  fontWeight: 600,
                  fontSize: 15,
                },
                title: { fill: 'purple', fontSize: 15 },
              }}
            />
            <LineMarkSeries
              data={data}
              style={{ strokeWidth: 3 }}
              markStyle={{ stroke: 'purple', fill: 'purple' }}
              curve={'curveMonotoneX'}
            />
          </FlexibleXYPlot>
        </Box>
      ) : (
        <VStack>
          <Heading>Loading...</Heading>
          <Image src={image} maxW="75%" />
        </VStack>
      )}
    </>
  );
};

export default Graph;
