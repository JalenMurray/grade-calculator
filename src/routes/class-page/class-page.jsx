import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClass, createAssignmentType, patchClass } from '../../utils/api';
import { COLOR_ZONES, formatFloat } from '../../utils/utils';

// Components
import { PageContainer } from '../../components/basic-component.styles';
import { ClassPageContainer, ButtonContainer, ButtonIconContainer } from './class-page.styles';
import { ContentContainer } from '../../components/basic-component.styles';
import AssignmentType from '../../components/assignments/assignment-type/assignment-type';
import ProgressBar from '../../components/class/progress-bar/progress-bar';
import Button from '../../components/button/button';
import { Col, Container, Row } from 'react-bootstrap';
import VModal from '../../components/v-modal/v-modal';
import Form from '../../components/form/form';
import { Share, ImportExport, AddCircleOutline, Edit, ColorLens } from '@mui/icons-material';
import BackButton from '../../components/back-button/back-button';
import DesiredScoreShowcase from '../../components/class/desired-score/desired-score';
import ClassHeader from '../../components/class/class-header/class-header';

// Context
import { ClassContext } from '../../contexts/class';
import { UserContext } from '../../contexts/user';
import Unauthorized from '../../components/unauthorized/unauthorized';
import GradeCalculator from '../../components/class/grade-calculator/grade-calculator';

const ClassPage = () => {
  const { id } = useParams();
  const { currentClass, setCurrentClass, updateClass, assignmentTypes, setAssignmentTypes, addAssignmentType } =
    useContext(ClassContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [authorized, setAuthorized] = useState(null);
  const [authMsg, setAuthMsg] = useState('');

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
    if (user.id === currentClass.user) {
      setAuthorized(true);
    } else {
      console.log('setting false');
      setAuthorized(false);
      const msg = user.id ? 'You do not have access to this class' : 'You must be logged in to view this page';
      setAuthMsg(msg);
    }
  }, [user, currentClass]);

  useEffect(() => {
    document.title = `${currentClass.code} -- ${currentClass.semester_str}`;

    return () => {
      document.title = 'Grade Master';
    };
  }, [currentClass]);

  const handleAddAssignmentType = async () => {
    const newAssignmentType = {
      name: 'New Assignment Type',
      max_score: 100,
      weight: 0,
      class_associated: id,
      default_name: 'Assignment',
      lock_weights: false,
      assignments: [],
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

  if (authorized == null) {
    return <PageContainer></PageContainer>;
  }

  return authorized ? (
    <ClassPageContainer className="text-dark m-4">
      <ClassHeader
        headerStr={`${currentClass.code} ${currentClass.title}`}
        semester={{ id: currentClass.semester, str: currentClass.semester_str }}
        color={currentClass.display_color}
      />
      <Container fluid>
        <Row>
          <Col lg="1">
            <DesiredScoreShowcase desiredScore={currentClass.desired_score} score={currentClass.score} />
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
            <GradeCalculator assignmentTypes={assignmentTypes} />
            {/* <ContentContainer>
              
              {assignmentTypes &&
                Object.values(assignmentTypes).map((aType, i) => (
                  <AssignmentType key={i} atId={aType.id} className="mb-4" />
                ))}
            </ContentContainer> */}
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
  ) : (
    <Unauthorized msg={authMsg} />
  );
};

export default ClassPage;
