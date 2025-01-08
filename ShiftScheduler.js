import React, { useState } from 'react';
import { Form, Dropdown, Input, Button } from 'semantic-ui-react';

const timeDurations = [
  { key: '30', text: '30 minutes', value: 30 },
  { key: '60', text: '1 hour', value: 60 },
];

const ShiftScheduler = ({ shifts, setShifts }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');
  const [soldiersPerShift, setSoldiersPerShift] = useState(1);

  const addShift = () => {
    if (startTime && endTime && duration) {
      setShifts([...shifts, { startTime, endTime, duration, soldiersPerShift }]);
    }
  };

  return (
    <div>
      <h3>Shift Scheduler</h3>
      <Form>
        <Form.Field>
          <Input
            placeholder="Start Time (e.g., 08:00)"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder="End Time (e.g., 12:00)"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            placeholder="Select Duration"
            fluid
            selection
            options={timeDurations}
            onChange={(e, { value }) => setDuration(value)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="number"
            placeholder="Soldiers per shift"
            value={soldiersPerShift}
            onChange={(e) => setSoldiersPerShift(Number(e.target.value))}
          />
        </Form.Field>
        <Button primary onClick={addShift}>
          Add Shift
        </Button>
      </Form>
    </div>
  );
};

export default ShiftScheduler;
