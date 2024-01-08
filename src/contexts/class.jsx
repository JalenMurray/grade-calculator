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
  const [assignments, setAssignments] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const newScore = Object.values(assignmentTypes).reduce((acc, at) => acc + at.total_score, 0);
    setScore(newScore);
  }, [assignmentTypes]);

  const updateTypeScores = (updatedAssignments) => {
    const newTotal = updatedAssignments.reduce((acc, a) => acc + (a.score / a.max_score) * a.weight, 0);
    const newMax = updatedAssignments.reduce((acc, a) => acc + a.weight, 0);
    return { total: newTotal, maxTotal: newMax };
  };

  const addAssignment = (atId, assignment) => {
    const updatedAssignments = assignmentTypes[atId].assignments.push(assignment);
    setAssignmentTypes({ ...assignmentTypes, [atId]: { ...assignmentTypes[atId], assignments: updatedAssignments } });
  };

  const removeAssignment = (atId, aIdx) => {
    const currAssignments = assignmentTypes[atId].assignments;
    const updatedAssignments = currAssignments.filter((_, i) => i != aIdx);
    const { total, maxTotal } = updateTypeScores(updatedAssignments);
    const updatedAssignmentType = {
      ...assignmentTypes[atId],
      assignments: updatedAssignments,
      total_score: total,
      max_total_score: maxTotal,
    };
    setAssignmentTypes({ ...assignmentTypes, [atId]: updatedAssignmentType });
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
    const { total, maxTotal } = updateTypeScores(updatedAssignments);
    const updatedAssignmentType = {
      ...assignmentTypes[atId],
      assignments: updatedAssignments,
      total_score: total,
      max_total_score: maxTotal,
    };
    setAssignmentTypes({ ...assignmentTypes, [atId]: updatedAssignmentType });
  };

  const balanceWeights = (atId) => {};

  const value = {
    name,
    setName,
    semester,
    setSemester,
    assignmentTypes,
    setAssignmentTypes,
    assignments,
    addAssignment,
    removeAssignment,
    updateAssignment,
    score,
    setScore,
  };
  return <ClassContext.Provider value={value}>{children}</ClassContext.Provider>;
};
