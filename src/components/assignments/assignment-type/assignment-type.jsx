import { useContext, useEffect, useState, Fragment } from 'react';
import { formatFloat } from '../../../utils/utils';
import { createAssignment, patchAssignmentType, destroyAssignmentType } from '../../../utils/api';

// Contexts
import { ClassContext } from '../../../contexts/class';

// Components
import { AddButton, AssignmentsContainer, LockIcon, DynamicValue } from './assignment-type.styles';
import Form from '../../form/form';
import VModal from '../../v-modal/v-modal';
import { Option } from '../assignment/assignment.styles';
import { AddCircleOutline, LockOpenRounded, LockRounded } from '@mui/icons-material';
import { Row, Col } from 'react-bootstrap';
import Assignment from '../assignment/assignment';
import Dropdown from '../../dropdown/dropdown';
import ClickableInput from '../../clickable-input/clickable-input';

const AssignmentType = ({ atId }) => {
  const { assignmentTypes, addAssignment, updateAssignmentType, deleteAssignmentType } = useContext(ClassContext);
  const [assignmentType, setAssignmentType] = useState({});
  const [lostPoints, setLostPoints] = useState(0.0);
  const [lockWeights, setLockWeights] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setAssignmentType(assignmentTypes[atId]);
  }, [assignmentTypes, atId]);

  useEffect(() => {
    setLostPoints(assignmentType.max_total_score - assignmentType.total_score);
    setLockWeights(assignmentType.lock_weights);
    console.log();
  }, [assignmentType]);

  const handleFloatChange = (e) => {
    const { name, value } = e.target;
    const newFloat = formatFloat(value, 2);
    updateAssignmentType(atId, name, newFloat);
  };

  const handleStringChange = (e) => {
    const { name, value } = e.target;
    updateAssignmentType(atId, name, value);
  };

  const handleAdd = async () => {
    const id = assignmentType.id;
    const newAssignment = {
      name: assignmentType.default_name,
      assignment_type: id,
    };
    const data = await createAssignment(newAssignment);
    addAssignment(id, data);
  };

  const handleDelete = async () => {
    await destroyAssignmentType(atId);
    deleteAssignmentType(atId);
  };

  const handleWeightBlur = async (e) => {
    const { name, value } = e.target;
    await patchAssignmentType(atId, { [name]: value });
  };

  const handleNameBlur = async (e) => {
    const { name, value } = e.target;
    await patchAssignmentType(atId, { [name]: value });
  };

  const handleLock = async () => {
    patchAssignmentType(atId, { lock_weights: !lockWeights });
    updateAssignmentType(atId, 'lock_weights', !lockWeights);
    setLockWeights(!lockWeights);
  };

  const handleChangeDefault = (e) => {
    const { name, value } = e.target;
    updateAssignmentType(atId, name, value);
  };

  const handleSubmitDefaultName = async (e) => {
    e.preventDefault();
    const patched = await patchAssignmentType(atId, {
      default_name: assignmentType.default_name,
      max_score: assignmentType.max_score,
    });
    console.log(patched);
    setModalOpen(false);
  };

  return (
    <AssignmentsContainer>
      <Row className="mt-4">
        <Col lg="6" style={{ display: 'flex' }}>
          <ClickableInput
            input={'light'}
            header={'dark'}
            blur={handleNameBlur}
            name={'name'}
            value={assignmentType.name || ''}
            onChange={handleStringChange}
          />
          <AddButton>
            <AddCircleOutline onClick={handleAdd} />
          </AddButton>
          <LockIcon>
            {lockWeights && <LockRounded />}
            {!lockWeights && <LockOpenRounded />}
          </LockIcon>
        </Col>
        <Col className="pt-2" lg="2">
          {lockWeights && (
            <ClickableInput
              input={'light'}
              header={'dark'}
              blur={handleWeightBlur}
              onChange={handleFloatChange}
              name="weight"
              value={assignmentType.weight || 0.0}
            />
          )}
          {!lockWeights && <DynamicValue>{formatFloat(assignmentType.weight, 4)}</DynamicValue>}
        </Col>
        <Col className="pt-2" lg="2">
          <DynamicValue>
            {formatFloat(assignmentType.total_score, 2)} / {formatFloat(assignmentType.max_total_score, 2)}
          </DynamicValue>
        </Col>
        <Col className="pt-2" lg="1">
          <DynamicValue>{formatFloat(lostPoints, 2)}</DynamicValue>
        </Col>
        <Col lg="1">
          <Dropdown
            children={
              <Fragment>
                <Option onClick={handleLock}>
                  {lockWeights && 'Unlock Weights'}
                  {!lockWeights && 'Lock Weights'}
                </Option>
                <Option onClick={() => setModalOpen(true)}>Edit Defaults</Option>
                <Option onClick={handleDelete}>Delete {assignmentType.name}</Option>
              </Fragment>
            }
          />
        </Col>
      </Row>
      <hr />
      {assignmentType.assignments &&
        assignmentType.assignments.map((assignment, i) => <Assignment key={i} atId={assignmentType.id} aIdx={i} />)}
      <VModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        header={'Modify Defaults'}
        body={
          <Form
            onSubmit={handleSubmitDefaultName}
            formData={[
              {
                label: 'Default Name',
                name: 'default_name',
                value: assignmentType.default_name,
                onChange: handleChangeDefault,
              },
              {
                label: 'Default Max Score',
                name: 'max_score',
                value: assignmentType.max_score,
                onChange: handleChangeDefault,
              },
            ]}
          />
        }
      />
    </AssignmentsContainer>
  );
};

export default AssignmentType;
