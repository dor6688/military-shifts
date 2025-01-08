import React, { useState } from 'react';
import { Form, Button, List, Input } from 'semantic-ui-react';

const SoldierList = ({ soldiers, setSoldiers }) => {
  const [name, setName] = useState('');

  const addSoldier = () => {
    if (name.trim()) {
      setSoldiers([...soldiers, name]);
      setName('');
    }
  };

  return (
    <div>
      <h3>Soldier Names</h3>
      <Form>
        <Input
          placeholder="Enter soldier name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button primary onClick={addSoldier}>
          Add Soldier
        </Button>
      </Form>
      <List>
        {soldiers.map((soldier, index) => (
          <List.Item key={index}>{index+1}.{soldier}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default SoldierList;
