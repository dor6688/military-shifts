import React, { useState } from "react";
import { Container, Form, Button, TextArea } from "semantic-ui-react";

function App() {
  const soldiersList = [
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
  ]
  const [soldiers, setSoldiers] = useState(soldiersList);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(30);
  const [soldiersPerShift, setSoldiersPerShift] = useState(2);
  const [schedule, setSchedule] = useState("");

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
    let currentTime = new Date("1970-01-01T" + startTime + "Z");

    while (currentTime.getHours() < parseInt(endTime.split(":")[0])) {
      let shiftSoldiers = [];
      for (let i = 0; i < soldiersPerShift; i++) {
        shiftSoldiers.push(shuffledSoldiers[soldierIndex % shuffledSoldiers.length]);
        soldierIndex++;
      }

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
        <Form.Input
          label="Soldiers (comma separated)"
          value={soldiers.join(", ")}
          onChange={(e) => setSoldiers(e.target.value.split(",").map((s) => s.trim()))}
        />
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
        <Button primary onClick={handleGenerateSchedule}>Generate Schedule</Button>
      </Form>

      <h3>Schedule</h3>
      <TextArea
        placeholder="Generated schedule will appear here..."
        value={schedule}
        style={{ width: "100%", minHeight: "200px", marginBottom: "10px" }}
        readOnly
      />
      <Button secondary onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
    </Container>
  );
}

export default App;
