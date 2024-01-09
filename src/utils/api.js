import axios from 'axios';

export const BASE_URL = 'http://localhost:8000/classes/';

///////////////////////////////////////
//////// General Data Actions ////////
/////////////////////////////////////

const getData = async (url, errorMessage) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(errorMessage, err);
    return null;
  }
};

const createData = async (url, data, errorMessage) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (err) {
    console.error(errorMessage, err);
    return null;
  }
};

const deleteData = async (url, errorMessage) => {
  try {
    await axios.delete(url);
    return true;
  } catch (err) {
    console.error(errorMessage, err);
    return false;
  }
};

const patchData = async (url, toUpdate, errorMessage) => {
  try {
    await axios.patch(url, toUpdate);
    return true;
  } catch (err) {
    console.error(errorMessage, err);
    return false;
  }
};

///////////////////////////////////////
/////////////// Users ////////////////
/////////////////////////////////////

export const getUser = async (id) => {
  const url = `${BASE_URL}users/${id}`;
  const data = await getData(url, `Error fetching user ${id}`);
  return data;
};

export const getUserClasses = async (id) => {
  const url = `${BASE_URL}users/${id}`;
  const user = await getData(url, `Error fetching user ${id}`);
  return user ? user.classes : null;
};

export const createUser = async (newUser) => {
  const url = `${BASE_URL}users/`;
  const data = await createData(url, newUser, 'Error creating new user');
  return data;
};

///////////////////////////////////////
////////////// Classes ///////////////
//////////////////////////////////////

export const getClass = async (id) => {
  const url = `${BASE_URL}classes/${id}`;
  const data = await getData(url, `Error fetching class ${id}`);
  return data;
};

export const createClass = async (newClass) => {
  const url = `${BASE_URL}classes/`;
  const data = await createData(url, newClass, 'Error creating new class');
  return data;
};

export const deleteClass = async (id) => {
  const url = `${BASE_URL}classes/${id}/`;
  const deleted = await deleteData(url, `Error deleting class ${id}`);
  return deleted;
};

export const patchClass = async (id, toUpdate) => {
  const url = `${BASE_URL}classes/${id}/`;
  const patched = await patchData(url, toUpdate, `Error updating class ${id}`);
  return patched;
};

///////////////////////////////////////
////////// Assignment Types //////////
//////////////////////////////////////

export const createAssignmentType = async (assignmentType) => {
  const url = `${BASE_URL}assignment_types/`;
  const data = await createData(url, assignmentType, 'Error creating new assignment type');
  return data;
};

export const deleteAssignmentType = async (id) => {
  const url = `${BASE_URL}assignment_types/${id}/`;
  const deleted = await deleteData(url, `Error deleting assignment type ${id}`);
  return deleted;
};

export const patchAssignmentType = async (id, toUpdate) => {
  const url = `${BASE_URL}assignment_types/${id}/`;
  const patched = await patchData(url, toUpdate, `Error updating assignment type ${id}`);
  return patched;
};

///////////////////////////////////////
//////////// Assignments //////////////
//////////////////////////////////////

export const createAssignment = async (assignment) => {
  const url = `${BASE_URL}assignments/`;
  const data = createData(url, assignment, 'Error creating new assignment');
  return data;
};

export const deleteAssignment = async (id) => {
  const url = `${BASE_URL}assignments/${id}/`;
  const deleted = await deleteData(url, `Error deleting assignment ${id}`);
  return deleted;
};

export const patchAssignment = async (id, toUpdate) => {
  const url = `${BASE_URL}assignments/${id}/`;
  const patched = await patchData(url, toUpdate, `Error updating assignment ${id}`);
  return patched;
};
