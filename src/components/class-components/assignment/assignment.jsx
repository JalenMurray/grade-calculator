import { useContext, useEffect, useState } from 'react';
import { AssignmentContainer, Name, Score, Weight } from './assignment.styles';
import { Row, Col, Container } from 'react-bootstrap';
import { BASE_URL } from '../../../utils/settings';
import axios from 'axios';
import { ClassContext } from '../../../contexts/class';

const Assignment = ({ atId, aIdx }) => {
  const { assignmentTypes, updateAssignment } = useContext(ClassContext);
  const [assignment, setAssignment] = useState({});
  const [name, setName] = useState('');
  const [score, setScore] = useState(0.0);
  const [maxScore, setMaxScore] = useState(0.0);
  const [weight, setWeight] = useState(0.0);
  const [weightedScore, setWeightedScore] = useState(0);
  const [lostPoints, setLostPoints] = useState(0);

  useEffect(() => {
    setAssignment(assignmentTypes[atId].assignments[aIdx]);
  }, []);

  useEffect(() => {
    setName(assignment.name);
    setScore(assignment.score);
    setMaxScore(assignment.max_score);
    setWeight(assignment.weight);
  }, [assignment]);

  useEffect(() => {
    if (score && maxScore && weight) {
      const scorePercent = score / maxScore;
      setWeightedScore(scorePercent * weight);
    }
  }, [score, maxScore, weight]);

  useEffect(() => {
    if (weightedScore) {
      setLostPoints(weight - weightedScore);
    }
  }, [weightedScore]);

  const formatFloat = (num, n) => {
    if (num) {
      return parseFloat(num.toFixed(n));
    }
    return num;
  };

  const updatedFloat = (n) => {
    if (n) {
      return parseFloat(n);
    } else {
      return 0.0;
    }
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    const url = `${BASE_URL}classes/assignments/${assignment.id}/`;
    const toUpdate = { [name]: value };
    console.log(toUpdate);
    try {
      const response = await axios.patch(url, toUpdate);
    } catch (error) {
      console.log('Error Editing Assignment:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == 'score') {
      setScore(updatedFloat(value));
    } else if (name == 'max_score') {
      setMaxScore(updatedFloat(value));
    }
    updateAssignment(atId, aIdx, name, updatedFloat(value));
  };

  return (
    <Container fluid>
      <Row>
        <Col lg="2">
          <Name>{name}</Name>
        </Col>
        <Col lg="4">
          <Score
            type="text"
            inputMode="numeric"
            pattern="[0-9]*[.,]?[0-9]+"
            name="score"
            value={score || 0.0}
            onChange={handleChange}
            onBlur={handleBlur}
          ></Score>
          /
          <Score
            type="text"
            inputMode="numeric"
            pattern="[0-9]*[.,]?[0-9]+"
            name="max_score"
            value={maxScore || 0.0}
            onChange={handleChange}
          ></Score>
        </Col>
        <Col lg="2">
          <Weight>{formatFloat(weight, 4)}</Weight>
        </Col>
        <Col lg="2">
          <Weight>{formatFloat(weightedScore, 4)}</Weight>
        </Col>
        <Col lg="2">
          <Weight>{formatFloat(lostPoints, 2)}</Weight>
        </Col>
      </Row>
    </Container>
  );
};

export default Assignment;
