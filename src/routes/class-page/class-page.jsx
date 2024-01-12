import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClass, createAssignmentType, patchClass } from '../../utils/api';
import { COLOR_ZONES, formatFloat } from '../../utils/utils';

// Components
import {
  ClassPageContainer,
  AssignmentsContainer,
  ClassHeader,
  ButtonContainer,
  ButtonIconContainer,
  DesiredScoreContainer,
  DesiredScore,
  SuccessMsg,
} from './class-page.styles';
import { ContentContainer } from '../../components/basic-component.styles';
import AssignmentType from '../../components/assignments/assignment-type/assignment-type';
import ProgressBar from '../../components/progress-bar/progress-bar';
import Button from '../../components/button/button';
import { Col, Container, Row } from 'react-bootstrap';
import VModal from '../../components/v-modal/v-modal';
import Form from '../../components/form/form';
import { Share, ImportExport, AddCircleOutline, Edit, ColorLens } from '@mui/icons-material';
import BackButton from '../../components/back-button/back-button';

// Context
import { ClassContext } from '../../contexts/class';

const getDesiredScoreColor = (distance) => {
  if (distance <= 5) {
    return COLOR_ZONES[4];
  } else if (distance <= 7.5) {
    return COLOR_ZONES[3];
  } else if (distance <= 10) {
    return COLOR_ZONES[2];
  } else if (distance <= 12.5) {
    return COLOR_ZONES[1];
  } else {
    return COLOR_ZONES[0];
  }
};

const ClassPage = () => {
  const { id } = useParams();
  const { currentClass, setCurrentClass, updateClass, assignmentTypes, setAssignmentTypes, addAssignmentType } =
    useContext(ClassContext);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [desiredScoreDistance, setDesiredScoreDistance] = useState(0);
  const [desiredScoreColor, setDesiredScoreColor] = useState('');
  const [desiredScoreMet, setDesiredScoreMet] = useState(false);

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
      setCurrentClass(foundClass);
      setAssignmentTypes(assignmentTypes);
      console.log(foundClass);
    };
    fetchClass();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.title = `${currentClass.code} -- ${currentClass.semester_str}`;

    return () => {
      document.title = 'Grade Calculator';
    };
  }, [currentClass]);

  useEffect(() => {
    const newDistance = formatFloat(currentClass.desired_score - currentClass.score, 2);
    setDesiredScoreDistance(newDistance);
    setDesiredScoreColor(getDesiredScoreColor(newDistance));
  }, [currentClass]);

  useEffect(() => {
    setDesiredScoreMet(desiredScoreDistance <= 0);
  }, [desiredScoreDistance]);

  const handleAddAssignmentType = async () => {
    const newAssignmentType = {
      name: 'New Assignment Type',
      max_score: 100,
      weight: 0,
      class_associated: id,
      default_name: 'Assignment',
      lock_weights: false,
    };
    await createAssignmentType(newAssignmentType);
    addAssignmentType(newAssignmentType);
  };

  const handleEditClass = async (e) => {
    e.preventDefault();
    const patch = { name: currentClass.code, desired_score: currentClass.desired_score };
    await patchClass(id, patch);
    setModalOpen(false);
  };

  const handleChangeClass = async (e) => {
    const { name, value } = e.target;
    const toUpdate = { [name]: value };
    updateClass(toUpdate);
  };

  return (
    <ClassPageContainer className="text-dark m-4">
      <BackButton text={currentClass.semester_str} url={`/semester/${currentClass.semester}`} />
      <ClassHeader className="text-light">
        <h1>
          {currentClass.code} {currentClass.title}
        </h1>
        <span className="text-secondary">{currentClass.semester_str}</span>
      </ClassHeader>
      <Container fluid>
        <Row>
          <Col lg="1">
            <DesiredScoreContainer>
              {!desiredScoreMet && (
                <Fragment>
                  <DesiredScore color={desiredScoreColor}>{desiredScoreDistance}%</DesiredScore>to Desired Score
                </Fragment>
              )}
              {desiredScoreMet && <SuccessMsg>You have reached your desired score!</SuccessMsg>}
            </DesiredScoreContainer>
            <ButtonContainer>
              <Button variant="secondary" className="text-light w-100" onClick={() => setModalOpen(true)}>
                <ButtonIconContainer>
                  <Edit />
                </ButtonIconContainer>
                Edit Class
              </Button>
              <Button variant="success" className="text-light w-100" onClick={handleAddAssignmentType}>
                <ButtonIconContainer>
                  <AddCircleOutline />
                </ButtonIconContainer>
                Add Assignment Type
              </Button>
              {/*
              <Button variant="dark-secondary" className="text-light w-100" onClick={handleAddAssignmentType}>
                <ButtonIconContainer>
                  <ColorLens />
                </ButtonIconContainer>
                Customize Progress Bar
              </Button>
              <Button variant="danger" className="text-light w-100" onClick={handleAddAssignmentType}>
                <ButtonIconContainer>
                  <ImportExport />
                </ButtonIconContainer>
                Import/Export
              </Button>
              <Button variant="warning" className="text-light w-100" onClick={handleAddAssignmentType}>
                <ButtonIconContainer>
                  <Share />
                </ButtonIconContainer>
                Share
              </Button> */}
            </ButtonContainer>
          </Col>
          <Col lg="10">
            <ProgressBar percentage={currentClass.score} />
            <ContentContainer>
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
            </ContentContainer>
          </Col>
          <Col lg="1">Something Else</Col>
        </Row>
      </Container>
      <VModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        header={'Edit Class'}
        body={
          <Form
            onSubmit={handleEditClass}
            formData={[
              {
                label: 'Code',
                name: 'code',
                value: currentClass.code,
                onChange: handleChangeClass,
              },
              {
                label: 'Title',
                name: 'title',
                value: currentClass.title,
                onChange: handleChangeClass,
              },
              {
                label: 'Desired Score',
                name: 'desired_score',
                value: currentClass.desired_score,
                onChange: handleChangeClass,
              },
            ]}
          />
        }
      />
    </ClassPageContainer>
  );
};

export default ClassPage;
