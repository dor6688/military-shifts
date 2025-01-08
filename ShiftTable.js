import React from 'react';
import { Table } from 'semantic-ui-react';

const ShiftTable = ({ shifts }) => {
  return (
    <div>
      <h3>Shift Table</h3>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Start Time</Table.HeaderCell>
            <Table.HeaderCell>End Time</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell>Soldiers</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {shifts.map((shift, index) => (
            <Table.Row key={index}>
              <Table.Cell>{shift.startTime}</Table.Cell>
              <Table.Cell>{shift.endTime}</Table.Cell>
              <Table.Cell>{shift.duration} minutes</Table.Cell>
              <Table.Cell>
                {shift.assignedSoldiers && shift.assignedSoldiers.length > 0
                  ? shift.assignedSoldiers.join(', ')
                  : 'No soldiers assigned'}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ShiftTable;
