import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL;

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

const destroyData = async (url, errorMessage) => {
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

export const getUserAuth = async (auth) => {
  const users = await getUsers();
  const foundUsers = users.filter((user) => user.auth_token === auth);
  return foundUsers[0];
};

export const getUsers = async () => {
  const url = `${BASE_URL}users/`;
  const data = await getData(url, `Error fetching users`);
  return data;
};

export const createUser = async (newUser) => {
  const url = `${BASE_URL}users/`;
  const data = await createData(url, newUser, 'Error creating new user');
  return data;
};

export const userExists = async (uid) => {
  const users = await getUsers();
  const foundUsers = users.filter((user) => user.uid === uid);
  return foundUsers[0];
};

export const patchUser = async (id, toUpdate) => {
  const url = `${BASE_URL}users/${id}/`;
  const patched = await patchData(url, toUpdate, `Error Updating User`);
  return patched;
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

export const destroyClass = async (id) => {
  const url = `${BASE_URL}classes/${id}/`;
  const deleted = await destroyData(url, `Error deleting class ${id}`);
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

export const destroyAssignmentType = async (id) => {
  const url = `${BASE_URL}assignment_types/${id}/`;
  const deleted = await destroyData(url, `Error deleting assignment type ${id}`);
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

export const destroyAssignment = async (id) => {
  const url = `${BASE_URL}assignments/${id}/`;
  const deleted = await destroyData(url, `Error deleting assignment ${id}`);
  return deleted;
};

export const patchAssignment = async (id, toUpdate) => {
  const url = `${BASE_URL}assignments/${id}/`;
  const patched = await patchData(url, toUpdate, `Error updating assignment ${id}`);
  return patched;
};

///////////////////////////////////////
////////////// Semester //////////////
/////////////////////////////////////

export const getSemester = async (id) => {
  const url = `${BASE_URL}semesters/${id}`;
  const data = await getData(url, `Error fetching assignment ${id}`);
  return data;
};

export const createSemester = async (newSemester) => {
  const url = `${BASE_URL}semesters/`;
  const data = await createData(url, newSemester, `Error creating semester`);
  return data;
};

export const destroySemester = async (id) => {
  const url = `${BASE_URL}semesters/${id}`;
  const deleted = await destroyData(url, `Error deleting semester ${id}`);
  return deleted;
};

export const patchSemester = async (id, toUpdate) => {
  const url = `${BASE_URL}semesters/${id}`;
  const patched = await patchData(url, toUpdate, `Error updating semester ${id}`);
  return patched;
};
