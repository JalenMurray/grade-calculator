import { useContext, useEffect, useState, Fragment } from 'react';
import { BASE_URL } from '../../../utils/settings';
import axios from 'axios';

// Contexts
import { ClassContext } from '../../../contexts/class';

// Components
import { Option, DynamicValue } from './assignment.styles';
import { Row, Col, Container } from 'react-bootstrap';
import AssignmentInput from '../assignments/assignment-input/assignment-input';
import Dropdown from '../../dropdown/dropdown';

const Assignment = ({ atId, aIdx }) => {
  const { assignmentTypes, updateAssignment, removeAssignment } = useContext(ClassContext);
  const [assignment, setAssignment] = useState({});
  const [id, setId] = useState(0);
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
    setId(assignment.id);
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

  const INPUT_SETTERS = {
    score: setScore,
    max_score: setMaxScore,
    weight: setWeight,
  };

  const FORMAT_LENGTH = {
    score: 2,
    max_score: 2,
    weight: 4,
  };

  const formatFloat = (num, n) => {
    if (num) {
      if (typeof num == 'string') {
        return parseFloat(parseFloat(num).toFixed(n));
      } else {
        return parseFloat(num.toFixed(n));
      }
    }
    return 0.0;
  };

  const handleFloatChange = (e) => {
    const { name, value } = e.target;
    const length = FORMAT_LENGTH[name];
    const newFloat = formatFloat(value, length);
    INPUT_SETTERS[name](newFloat);
    updateAssignment(atId, aIdx, name, newFloat);
  };

  const handleDelete = async () => {
    const url = `${BASE_URL}classes/assignments/${id}/`;
    try {
      const response = await axios.delete(url);
    } catch (error) {
      console.log('Error Editing Assignment:', error);
    }
    removeAssignment(atId, aIdx);
  };

  return (
    <Container fluid>
      <Row>
        <Col lg="2">
          <AssignmentInput
            assignmentId={id}
            inputType={'text'}
            name={'name'}
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col lg="4">
          <Row>
            <Col lg="3">
              <AssignmentInput
                assignmentId={id}
                inputType={'num'}
                name={'score'}
                value={score || 0.0}
                onChange={handleFloatChange}
              />
            </Col>
            <Col lg="3">/</Col>
            <Col lg="3">
              <AssignmentInput
                assignmentId={id}
                inputType={'num'}
                name={'max_score'}
                value={maxScore || 0.0}
                onChange={handleFloatChange}
              />
            </Col>
          </Row>
        </Col>
        <Col lg="2">
          <AssignmentInput
            assignmentId={id}
            inputType={'num'}
            name={'weight'}
            value={weight || 0.0}
            onChange={handleFloatChange}
          />
        </Col>
        <Col lg="2">
          <DynamicValue>{formatFloat(weightedScore, 4)}</DynamicValue>
        </Col>
        <Col lg="1">
          <DynamicValue>{formatFloat(lostPoints, 2)}</DynamicValue>
        </Col>
        <Col lg="1">
          <Dropdown
            children={
              <Fragment>
                <Option onClick={handleDelete}>Delete</Option>
              </Fragment>
            }
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Assignment;
