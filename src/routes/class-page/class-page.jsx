import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClass, createAssignmentType } from '../../utils/api';

// Components
import { ClassPageContainer, AssignmentsContainer, ClassHeader, ButtonContainer } from './class-page.styles';
import AssignmentType from '../../components/assignments/assignment-type/assignment-type';
import ProgressBar from '../../components/progress-bar/progress-bar';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { ClassContext } from '../../contexts/class';

const ClassPage = () => {
  const { id } = useParams();
  const {
    name,
    setName,
    semester,
    setSemester,
    score,
    setScore,
    assignmentTypes,
    setAssignmentTypes,
    addAssignmentType,
  } = useContext(ClassContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClass = async () => {
      const foundClass = await getClass(id);
      if (!foundClass) {
        navigate('/not_found');
        return;
      }

      const assignmentTypes = foundClass.assignment_types.reduce((acc, obj) => {
        acc[obj.id] = { ...obj };
        return acc;
      }, {});
      setName(foundClass.name);
      setSemester(foundClass.semester);
      setScore(foundClass.score);
      setAssignmentTypes(assignmentTypes);
    };
    fetchClass();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.title = `${name} -- ${semester}`;

    return () => {
      document.title = 'Grade Calculator';
    };
  }, [name, semester]);

  const handleAddAssignmentType = async () => {
    const newAssignmentType = {
      name: 'New Assignment Type',
      max_score: 100,
      weight: 0,
      class_associated: id,
      default_name: 'Assignment',
      lock_weights: false,
    };
    console.log('CREATING ASSIGNMENT CLASS-PAGE');
    await createAssignmentType(newAssignmentType);
    addAssignmentType(newAssignmentType);
  };

  return (
    <ClassPageContainer className="text-dark m-4">
      <ClassHeader className="text-light">
        <h1>{name}</h1>
        <span className="text-secondary">{semester}</span>
      </ClassHeader>
      <Container fluid>
        <Row>
          <Col lg="1">
            <ButtonContainer>
              <Button variant="primary" className="text-dark" onClick={handleAddAssignmentType}>
                Add Assignment Type
              </Button>
            </ButtonContainer>
          </Col>
          <Col lg="10">
            <ProgressBar percentage={score} />
            <AssignmentsContainer className="bg-secondary">
              <Row className="pb-4">
                <Col lg="2">Name</Col>
                <Col lg="4">Scores</Col>
                <Col lg="2">Weight</Col>
                <Col lg="2">Weighted Score</Col>
                <Col lg="2">Lost Points</Col>
              </Row>
              {assignmentTypes &&
                Object.values(assignmentTypes).map((aType, i) => (
                  <AssignmentType key={i} atId={aType.id} className="mb-4"></AssignmentType>
                ))}
            </AssignmentsContainer>
          </Col>
          <Col lg="1">Something Else</Col>
        </Row>
      </Container>
    </ClassPageContainer>
  );
};

export default ClassPage;
