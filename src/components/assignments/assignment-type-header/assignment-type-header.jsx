import { formatFloat } from '../../../utils/utils';
import { AddCircleOutline, LockOpenRounded, LockRounded } from '@mui/icons-material';
import { AddButton, DynamicValueContaier, Header, LockIcon, NameContainer } from './assignment-type-header.styles';
import { Col } from 'react-bootstrap';
import Dropdown from '../../dropdown/dropdown';
import { Fragment, useContext, useState } from 'react';
import ClickableInput from '../../clickable-input/clickable-input';
import { ClassContext } from '../../../contexts/class';
import { createAssignment, destroyAssignmentType, patchAssignmentType } from '../../../utils/api';
import VModal from '../../v-modal/v-modal';
import Form from '../../form/form';

const AssignmentTypeHeader = ({ at, guest }) => {
  const { updateAssignmentType, addAssignment, deleteAssignmentType } = useContext(ClassContext);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateAssignmentType(at.id, name, value);
  };

  const handleAdd = async () => {
    const id = at.id;
    const newAssignment = {
      name: at.default_name,
      assignment_type: id,
      weight: 0,
      score: at.max_score,
      max_score: at.max_score,
    };
    if (!guest) {
      await createAssignment(newAssignment);
    }
    addAssignment(id, newAssignment);
  };

  const handleDelete = async () => {
    if (!guest) {
      destroyAssignmentType(at.id);
    }
    deleteAssignmentType(at.id);
  };

  const handleBlur = async (e) => {
    if (!guest) {
      const { name, value } = e.target;
      await patchAssignmentType(at.id, { [name]: value });
    }
  };

  const toggleLockWeight = async () => {
    if (!guest) {
      await patchAssignmentType(at.id, { lock_weights: !at.lock_weights });
    }
    updateAssignmentType(at.id, 'lock_weights', !at.lock_weights);
  };

  const handleSubmitDefaultName = async (e) => {
    e.preventDefault();
    if (!guest) {
      await patchAssignmentType(at.id, {
        default_name: at.default_name,
        max_score: at.max_score,
      });
    }
    setModalOpen(false);
  };

  return (
    <Fragment>
      <Header>
        <NameContainer lg="6">
          <ClickableInput blur={handleBlur} name={'name'} value={at.name || ''} onChange={handleChange} />
          <AddButton>
            <AddCircleOutline onClick={handleAdd} />
          </AddButton>
          <LockIcon>
            {at.lock_weights && <LockRounded />}
            {!at.lock_weights && <LockOpenRounded />}
          </LockIcon>
        </NameContainer>
        <DynamicValueContaier lg="2">
          {at.lock_weights && (
            <ClickableInput
              blur={handleBlur}
              name={'weight'}
              type={'number'}
              value={at.weight || 0}
              onChange={handleChange}
            />
          )}
          {!at.lock_weights && <h4>{at.weight}</h4>}
        </DynamicValueContaier>
        <DynamicValueContaier lg="2">
          <h4>
            {at.total_score} / {at.max_total_score}
          </h4>
        </DynamicValueContaier>
        <DynamicValueContaier lg="1">
          <h4>0</h4>
        </DynamicValueContaier>
        <Col lg="1">
          <Dropdown
            children={
              <Fragment>
                <span onClick={toggleLockWeight}>
                  {at.locked && 'Unlock Weights'}
                  {!at.locked && 'Lock Weights'}
                </span>
                <span onClick={() => setModalOpen(true)}>Edit Defaults</span>
                <span onClick={handleDelete}>Delete</span>
              </Fragment>
            }
          />
        </Col>
      </Header>
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
                value: at.default_name,
                onChange: handleChange,
              },
              {
                label: 'Default Max Score',
                name: 'max_score',
                value: at.max_score,
                onChange: handleChange,
              },
            ]}
          />
        }
      />
      <hr />
    </Fragment>
  );
};

export default AssignmentTypeHeader;
