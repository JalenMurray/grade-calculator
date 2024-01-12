import { createContext, useEffect, useState } from 'react';

export const ClassContext = createContext({
  assignmentTypes: {},
  setAssignmentTypes: () => null,
  score: 0,
  setScore: () => null,
  desiredScore: 0,
  setDesiredScore: () => null,
});

export const ClassProvider = ({ children }) => {
  const [currentClass, setCurrentClass] = useState({});
  const [assignmentTypes, setAssignmentTypes] = useState({});

  useEffect(() => {
    const newScore = Object.values(assignmentTypes).reduce((acc, at) => acc + at.total_score, 0);
    const toUpdate = { score: newScore };
    updateClass(toUpdate);
  }, [assignmentTypes]);

  // Class Updates

  const updateClass = (toUpdate) => {
    const updatedClass = { ...currentClass, ...toUpdate };
    setCurrentClass(updatedClass);
  };

  const getAtScores = (updatedAssignments) => {
    const newTotal = updatedAssignments.reduce((acc, a) => acc + (a.score / a.max_score) * a.weight, 0);
    const newMax = updatedAssignments.reduce((acc, a) => acc + a.weight, 0);
    return { total: newTotal, maxTotal: newMax };
  };

  const getAtWeight = (atId, weightedAssignments) => {
    const assignmentType = assignmentTypes[atId];
    if (assignmentType.lock_weights) {
      return assignmentType.weight;
    }
    return weightedAssignments.reduce((acc, a) => acc + a.weight, 0);
  };

  const getBalancedWeights = (atId, updatedAssignments, newWeight) => {
    const assignmentType = assignmentTypes[atId];
    if (assignmentType.lock_weights) {
      const currAssignments = updatedAssignments;
      const numAssignments = currAssignments.length;
      let updatedWeight;
      if (newWeight) {
        updatedWeight = newWeight / numAssignments;
      } else {
        updatedWeight = assignmentType.weight / numAssignments;
      }
      const weightedAssignments = currAssignments.map((a) => ({ ...a, weight: updatedWeight }));
      return weightedAssignments;
    }
    return updatedAssignments;
  };

  const updateAssignments = (atId, updatedAssignments) => {
    const assignmentType = assignmentTypes[atId];
    const weightedAssignments = getBalancedWeights(atId, updatedAssignments);
    const atWeight = getAtWeight(atId, weightedAssignments);
    const { total, maxTotal } = getAtScores(weightedAssignments);
    const updatedAssignmentType = {
      ...assignmentType,
      assignments: weightedAssignments,
      total_score: total,
      max_total_score: maxTotal,
      weight: atWeight,
    };
    setAssignmentTypes({ ...assignmentTypes, [atId]: updatedAssignmentType });
  };

  const addAssignment = (atId, assignment) => {
    const updatedAssignments = [...assignmentTypes[atId].assignments, assignment];
    updateAssignments(atId, updatedAssignments);
  };

  const removeAssignment = (atId, aIdx) => {
    const currAssignments = assignmentTypes[atId].assignments;
    const updatedAssignments = currAssignments.filter((_, i) => i !== aIdx);
    updateAssignments(atId, updatedAssignments);
  };

  const updateAssignment = (atId, aIdx, name, value) => {
    const currAssignments = assignmentTypes[atId].assignments;
    const currAssignment = currAssignments[aIdx];
    const newAssignment = { ...currAssignment, [name]: value };
    const updatedAssignments = currAssignments.map((a, i) => {
      if (i === aIdx) {
        return newAssignment;
      }
      return a;
    });
    updateAssignments(atId, updatedAssignments);
  };

  const addAssignmentType = (newAssignmentType) => {
    const id = newAssignmentType.id;
    setAssignmentTypes({ ...assignmentTypes, [id]: newAssignmentType });
  };

  const deleteAssignmentType = (id) => {
    const { [id]: deleted, ...updatedAssignmentTypes } = assignmentTypes;
    setAssignmentTypes(updatedAssignmentTypes);
  };

  const updateAssignmentType = (id, name, value) => {
    const currAssignmentType = assignmentTypes[id];
    let updatedAssignmentType;
    if (name === 'weight') {
      const updatedAssignments = getBalancedWeights(id, currAssignmentType.assignments, value);
      updatedAssignmentType = { ...currAssignmentType, assignments: updatedAssignments, [name]: value };
    } else if (name === 'lock_weights') {
      const updatedAssignments = getBalancedWeights(id, currAssignmentType.assignments);
      console.log('UPDATED_ASSIGNMENTS', updatedAssignments);
      updatedAssignmentType = { ...currAssignmentType, assignments: updatedAssignments, [name]: value };
    } else {
      updatedAssignmentType = { ...currAssignmentType, [name]: value };
    }
    setAssignmentTypes({ ...assignmentTypes, [id]: updatedAssignmentType });
  };

  const value = {
    currentClass,
    setCurrentClass,
    updateClass,
    assignmentTypes,
    setAssignmentTypes,
    addAssignment,
    removeAssignment,
    updateAssignment,
    addAssignmentType,
    deleteAssignmentType,
    updateAssignmentType,
  };
  return <ClassContext.Provider value={value}>{children}</ClassContext.Provider>;
};
