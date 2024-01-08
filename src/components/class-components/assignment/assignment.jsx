import { useEffect, useState } from 'react';
import { AssignmentContainer, Name, Score, Weight } from './assignment.styles';
import { Row, Col, Container } from 'react-bootstrap';
import { BASE_URL } from '../../../utils/settings';
import axios from 'axios';

const Assignment = ({ assignment }) => {
  const [name, setName] = useState(assignment.name);
  const [score, setScore] = useState(assignment.score);
  const [maxScore, setMaxScore] = useState(assignment.max_score);
  const [weightedScore, setWeightedScore] = useState(0);
  const [lostPoints, setLostPoints] = useState(0);

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
      return 0;
    }
  };

  useEffect(() => {
    setWeightedScore(assignment.weight * score);
    setLostPoints(assignment.weight - weightedScore);
  }, []);

  useEffect(() => {
    if (score && maxScore) {
      const scorePercentage = score / maxScore || 0;
      const newWeighted = scorePercentage * assignment.weight;
      setWeightedScore(newWeighted);
    }
  }, [score, maxScore]);

  useEffect(() => {
    if (weightedScore) {
      setLostPoints(assignment.weight - weightedScore);
    }
  }, [weightedScore]);

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    const url = `${BASE_URL}classes/assignments/${assignment.id}/`;
    const toUpdate = { [name]: value };

    try {
      const response = await axios.patch(url, toUpdate);
    } catch (error) {
      console.log('Error Editing Assignment:', error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col lg="2">
          <Name>{name}</Name>
        </Col>
        <Col lg="4">
          <Score
            name="score"
            value={score}
            onChange={(e) => {
              setScore(updatedFloat(e.target.value));
            }}
            onBlur={handleBlur}
          ></Score>
          /
          <Score
            name="max_score"
            value={maxScore}
            onChange={(e) => {
              setMaxScore(updatedFloat(e.target.value));
            }}
          ></Score>
        </Col>
        <Col lg="2">
          <Weight>{formatFloat(assignment.weight, 4)}</Weight>
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
