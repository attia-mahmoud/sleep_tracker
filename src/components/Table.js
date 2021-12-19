import React from 'react';
import { db } from '../Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
} from '@chakra-ui/react';
import { UserContext } from '../App.js';

const RecordsTable = () => {
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

  return (
    <>
      <Box id="Table">
        <Table variant="striped" colorScheme="purple">
          <TableCaption placement="top" fontSize="1.7rem" mb="5">
            A Summary of Your Sleeping Hours
          </TableCaption>
          <Thead>
            <Tr>
              <Th color="white">Date</Th>
              <Th color="white" isNumeric>
                Sleep Time
              </Th>
              <Th color="white" isNumeric>
                Wake Up Time
              </Th>
              <Th color="white" isNumeric>
                Sleep Duration (Hours)
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {records.map(record => {
              return (
                <Tr key={record.id}>
                  <Td>{record.date}</Td>
                  <Td isNumeric>{record.sleep_time}</Td>
                  <Td isNumeric>{record.wake_time}</Td>
                  <Td isNumeric>
                    {Math.round(
                      record.sleep_duration.hours +
                        (record.sleep_duration.minutes / 60) * 100
                    ) / 10}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default RecordsTable;
