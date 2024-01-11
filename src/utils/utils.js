// Feature Images
import gradeBarImg from '../assets/feature-images/dynamic-grade-bar.png';
import lockWeights from '../assets/feature-images/lock-weights.png';
import desiredScore from '../assets/feature-images/desired-score.png';

export const formatFloat = (num, n) => {
  if (num) {
    if (typeof num == 'string') {
      return parseFloat(parseFloat(num).toFixed(n));
    } else {
      return parseFloat(num.toFixed(n));
    }
  }
  return 0.0;
};

export const COLOR_ZONES = ['#FF0000', '#FFC100', '#FFFF00', '#D6FF00', '#63FF00'];

export const FEATURES = [
  {
    label: 'Dynamic Grade Bar',
    description:
      'A bar visualizer for your current grade in the class. Score is dynamically generated based on scores and weights of assignments. Changes color based on current grade.',
    image: gradeBarImg,
  },
  {
    label: 'Lock Weights',
    description:
      'Ability to lock weights for an assignment type.  This will cause the weights for individual assignments to be automatically balanced based on the number of assignments. Ex. 27 / 4 = 6.75',
    image: lockWeights,
  },
  {
    label: 'Desired Score',
    description:
      'Customizable desired score for a class which will showcase how far your current score is from your desired score.  Changes color based on distance from the desired score.  Ex. Current Score = 70.06 and Desired Score = 80 so 9.94% is needed to reach desired score',
    image: desiredScore,
  },
];
