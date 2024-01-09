import { createContext, useEffect, useState } from 'react';

export const ClassContext = createContext({
  name: '',
  setName: () => null,
  semester: '',
  setSemester: () => null,
  assignmentTypes: {},
  setAssignmentTypes: () => null,
  assignments: {},
  setAssignments: () => null,
  score: 0,
  setScore: () => null,
});

export const ClassProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [semester, setSemester] = useState('');
  const [assignmentTypes, setAssignmentTypes] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const newScore = Object.values(assignmentTypes).reduce((acc, at) => acc + at.total_score, 0);
    setScore(newScore);
    console.log('UPDATED SCORE');
  }, [assignmentTypes]);

  const getAtScores = (updatedAssignments) => {
    const newTotal = updatedAssignments.reduce((acc, a) => acc + (a.score / a.max_score) * a.weight, 0);
    const newMax = updatedAssignments.reduce((acc, a) => acc + a.weight, 0);
    return { total: newTotal, maxTotal: newMax };
  };

  const getAtWeight = (atId) => {
    const assignmentType = assignmentTypes[atId];
    if (assignmentType.lock_weights) {
      return assignmentType.weight;
    }
    return assignmentType.assignments.reduce((acc, a) => acc + a.weight, 0);
  };

  const getBalancedWeights = (atId, updatedAssignments) => {
    const assignmentType = assignmentTypes[atId];
    if (assignmentType.lock_weights) {
      const currAssignments = updatedAssignments;
      const numAssignments = currAssignments.length;
      const newWeight = assignmentType.weight / numAssignments;
      const weightedAssignments = currAssignments.map((a) => ({ ...a, weight: newWeight }));
      return weightedAssignments;
    }
    return updatedAssignments;
  };

  const updateAssignments = (atId, updatedAssignments) => {
    const assignmentType = assignmentTypes[atId];
    const weightedAssignments = getBalancedWeights(atId, updatedAssignments);
    console.log(weightedAssignments);
    const atWeight = getAtWeight(atId);
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
    console.log('ADDED ASSIGNMENT', updatedAssignments);
    updateAssignments(atId, updatedAssignments);
  };

  const removeAssignment = (atId, aIdx) => {
    const currAssignments = assignmentTypes[atId].assignments;
    const updatedAssignments = currAssignments.filter((_, i) => i != aIdx);
    updateAssignments(atId, updatedAssignments);
  };

  const updateAssignment = (atId, aIdx, name, value) => {
    const currAssignments = assignmentTypes[atId].assignments;
    const currAssignment = currAssignments[aIdx];
    const newAssignment = { ...currAssignment, [name]: value };
    const updatedAssignments = currAssignments.map((a, i) => {
      if (i == aIdx) {
        return newAssignment;
      }
      return a;
    });
    updateAssignments(atId, updatedAssignments);
  };

  const value = {
    name,
    setName,
    semester,
    setSemester,
    assignmentTypes,
    setAssignmentTypes,
    addAssignment,
    removeAssignment,
    updateAssignment,
    score,
    setScore,
  };
  return <ClassContext.Provider value={value}>{children}</ClassContext.Provider>;
};
