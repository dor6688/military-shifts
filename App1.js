import React, { useState } from "react";
import { Container, Form, Button, TextArea, Dropdown } from "semantic-ui-react";

function App() {
  const initialSoldiers = [
    "לבנטר",
    "אוריאל",
    "אמסלם",
    "שקד",
    "חפיף",
    "שי",
    "אלמסי",
    "מוטי",
    "נתן",
    "לידור",
    "שחר",
    "מלכה",
    "תומר",
    "שמח",
    "דנציגר",
  ];
  const [soldiers, setSoldiers] = useState(initialSoldiers);
  const [newSoldier, setNewSoldier] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(30);
  const [soldiersPerShift, setSoldiersPerShift] = useState(2);
  const [schedule, setSchedule] = useState("");
  const [timeConstraints, setTimeConstraints] = useState([]);
  const [pairConstraints, setPairConstraints] = useState([]);

  const soldierOptions = soldiers.map((soldier) => ({
    key: soldier,
    text: soldier,
    value: soldier,
  }));

  const addSoldier = () => {
    if (newSoldier.trim() && !soldiers.includes(newSoldier.trim())) {
      setSoldiers([...soldiers, newSoldier.trim()]);
      setNewSoldier("");
    }
  };

  const addTimeConstraint = () => {
    setTimeConstraints([...timeConstraints, { soldier: "", time: "" }]);
  };

  const updateTimeConstraint = (index, field, value) => {
    const updatedConstraints = [...timeConstraints];
    updatedConstraints[index][field] = value;
    setTimeConstraints(updatedConstraints);
  };

  const addPairConstraint = () => {
    setPairConstraints([...pairConstraints, { soldier1: "", soldier2: "" }]);
  };

  const updatePairConstraint = (index, field, value) => {
    const updatedConstraints = [...pairConstraints];
    updatedConstraints[index][field] = value;
    setPairConstraints(updatedConstraints);
  };

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleGenerateSchedule = () => {
    let shuffledSoldiers = shuffleArray(soldiers);
    let newSchedule = [];
    let soldierIndex = 0;
    let currentTime = new Date(`1970-01-01T${startTime}:00`);

    while (currentTime < new Date(`1970-01-01T${endTime}:00`)) {
      let shiftSoldiers = [];

      // Apply time constraints
      const currentTimeStr = currentTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const timeConstraint = timeConstraints.find((c) => c.time === currentTimeStr);
      console.log({timeConstraint, shiftSoldiers})
      if (timeConstraint && !shiftSoldiers.includes(timeConstraint.soldier)) {
        shiftSoldiers.push(timeConstraint.soldier);
      }

      // Fill remaining slots
      while (shiftSoldiers.length < soldiersPerShift) {
        if (!shiftSoldiers.includes(shuffledSoldiers[soldierIndex % shuffledSoldiers.length])) {
          shiftSoldiers.push(shuffledSoldiers[soldierIndex % shuffledSoldiers.length]);
        }
        soldierIndex++;
      }

      // Apply pair constraints
      pairConstraints.forEach((pair) => {
        if (
          shiftSoldiers.includes(pair.soldier1) &&
          !shiftSoldiers.includes(pair.soldier2)
        ) {
          shiftSoldiers.pop(); // Replace one of the current soldiers
          shiftSoldiers.push(pair.soldier2);
        }
      });

      const shiftEndTime = new Date(currentTime);
      shiftEndTime.setMinutes(shiftEndTime.getMinutes() + duration);

      newSchedule.push(
        `${currentTime.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${shiftEndTime.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${shiftSoldiers.join(", ")}`
      );

      currentTime = shiftEndTime;
    }

    setSchedule(newSchedule.join("\n"));
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(schedule).then(() => {
      alert("Schedule copied to clipboard!");
    });
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <h2>Military Service Shifts</h2>
      <Form>
        <Form.Group>
          <Form.Input
            label="Add New Soldier"
            placeholder="Enter soldier name"
            value={newSoldier}
            onChange={(e) => setNewSoldier(e.target.value)}
          />
          <Button onClick={addSoldier}>Add Soldier</Button>
        </Form.Group>
        <Form.Input
          label="Start Time (HH:MM)"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <Form.Input
          label="End Time (HH:MM)"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <Form.Input
          label="Duration (minutes)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <Form.Input
          label="Soldiers Per Shift"
          type="number"
          value={soldiersPerShift}
          onChange={(e) => setSoldiersPerShift(Number(e.target.value))}
        />

        <h3>Time Constraints</h3>
        {timeConstraints.map((constraint, index) => (
          <Form.Group key={index}>
            <Dropdown
              placeholder="Select Soldier"
              options={soldierOptions}
              value={constraint.soldier}
              onChange={(e, { value }) =>
                updateTimeConstraint(index, "soldier", value)
              }
            />
            <Form.Input
              placeholder="Time (HH:MM)"
              value={constraint.time}
              onChange={(e) =>
                updateTimeConstraint(index, "time", e.target.value)
              }
            />
          </Form.Group>
        ))}
        <Button onClick={addTimeConstraint}>Add Time Constraint</Button>

        <h3>Pair Constraints</h3>
        {pairConstraints.map((constraint, index) => (
          <Form.Group key={index}>
            <Dropdown
              placeholder="Select Soldier 1"
              options={soldierOptions}
              value={constraint.soldier1}
              onChange={(e, { value }) =>
                updatePairConstraint(index, "soldier1", value)
              }
            />
            <Dropdown
              placeholder="Select Soldier 2"
              options={soldierOptions}
              value={constraint.soldier2}
              onChange={(e, { value }) =>
                updatePairConstraint(index, "soldier2", value)
              }
            />
          </Form.Group>
        ))}
        <Button onClick={addPairConstraint}>Add Pair Constraint</Button>

        <Button primary onClick={handleGenerateSchedule}>
          Generate Schedule
        </Button>
      </Form>

      <h3>Schedule</h3>
      <TextArea
        placeholder="Generated schedule will appear here..."
        value={schedule}
        style={{ width: "100%", minHeight: "200px", marginBottom: "10px" }}
        readOnly
      />
      <Button secondary onClick={handleCopyToClipboard}>
        Copy to Clipboard
      </Button>
    </Container>
  );
}

export default App;
