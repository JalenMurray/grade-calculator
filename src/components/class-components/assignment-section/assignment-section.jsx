import { useContext, useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/settings';

// Contexts
import { ClassContext } from '../../../contexts/class';

// Components
import { AddButton, AssignmentsContainer } from './assignment-section.styles';
import { Option } from '../assignment/assignment.styles';
import { AddCircleOutline } from '@mui/icons-material';
import { Row, Col } from 'react-bootstrap';
import Assignment from '../assignment/assignment';
import Dropdown from '../../dropdown/dropdown';

const AssignmentSection = ({ atId }) => {
  const { assignmentTypes, addAssignment } = useContext(ClassContext);
  const [assignmentType, setAssignmentType] = useState({});
  const [name, setName] = useState('');
  const [totalScore, setTotalScore] = useState(0.0);
  const [maxTotalScore, setMaxTotalScore] = useState(0.0);
  const [lostPoints, setLostPoints] = useState(0.0);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    setAssignmentType(assignmentTypes[atId]);
  }, [assignmentTypes]);

  useEffect(() => {
    setName(assignmentType.name);
    setTotalScore(assignmentType.total_score);
    setMaxTotalScore(assignmentType.max_total_score);
    setAssignments(assignmentType.assignments);
  }, [assignmentType]);

  useEffect(() => {
    setLostPoints(maxTotalScore - totalScore);
  }, [maxTotalScore, totalScore]);

  const updatedFloat = (n) => {
    if (n) {
      return parseFloat(n.toFixed(2));
    }
    return '';
  };

  const handleAdd = async () => {
    const id = assignmentType.id;
    const newAssignment = {
      name: assignmentType.default_name,
      assignment_type: id,
    };
    const url = `${BASE_URL}classes/assignments/`;
    try {
      const response = await axios.post(url, newAssignment);
      const data = response.data;
      console.log(data);
      addAssignment(id, data);
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  return (
    <AssignmentsContainer>
      <Row className="mt-4">
        <Col lg="8">
          <h3>
            {name}
            <AddButton>
              <AddCircleOutline onClick={handleAdd} />
            </AddButton>
          </h3>
        </Col>
        <Col className="pt-2" lg="2">
          <h4>
            {updatedFloat(totalScore)} / {updatedFloat(maxTotalScore)}
          </h4>
        </Col>
        <Col className="pt-2" lg="1">
          <h4>{updatedFloat(lostPoints)}</h4>
        </Col>
        <Col lg="1">
          <Dropdown
            children={
              <Fragment>
                <Option>Balance Weights</Option>
              </Fragment>
            }
          />
        </Col>
      </Row>
      <hr />
      {assignments &&
        assignments.map((assignment, i) => <Assignment key={assignment.id} atId={assignmentType.id} aIdx={i} />)}
    </AssignmentsContainer>
  );
};

export default AssignmentSection;
