import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/settings';

// Components
import { ClassPageContainer, AssignmentsContainer, ClassHeader } from './class-page.styles';
import AssignmentSection from '../../components/class-components/assignment-section/assignment-section';
import ProgressBar from '../../components/progress-bar/progress-bar';
import { Col, Row } from 'react-bootstrap';

const ClassPage = ({ classId }) => {
  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [semester, setSemester] = useState('');
  const [score, setScore] = useState(0);
  const [assignmentTypes, setAssignmentTypes] = useState([]);

  useEffect(() => {
    const fetchClass = async () => {
      const url = `${BASE_URL}classes/classes/${classId}`;
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching class:', error);
      }
    };
    fetchClass();
  }, []);

  useEffect(() => {
    console.log(data);
    setName(data.name);
    setSemester(data.semester);
    setScore(data.score);
    setAssignmentTypes(data.assignment_types);
  }, [data]);

  return (
    <ClassPageContainer className="text-dark m-4">
      <ClassHeader className="text-light">
        <h1>{name}</h1>
        <span className="text-secondary">{semester}</span>
      </ClassHeader>
      <ProgressBar percentage={score} />
      <AssignmentsContainer className="bg-secondary m-3">
        <Row className="pb-4">
          <Col lg="2">Name</Col>
          <Col lg="4">Scores</Col>
          <Col lg="2">Weight</Col>
          <Col lg="2">Weighted Score</Col>
          <Col lg="2">Lost Points</Col>
        </Row>
        {assignmentTypes &&
          assignmentTypes.map((aType) => (
            <AssignmentSection key={aType.id} assignmentType={aType} className="mb-4"></AssignmentSection>
          ))}
      </AssignmentsContainer>
    </ClassPageContainer>
  );
};

export default ClassPage;
