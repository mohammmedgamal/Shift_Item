/**
 * SEC 12-hour shift rotation logic for 4 groups (A, B, C, D)
 * 8-day cycle example
 */

const GROUPS = ['A', 'B', 'C', 'D'];
const REFERENCE_DATE = new Date('2024-01-01'); // Fixed start date

export const getCurrentShift = (date = new Date()) => {
  const diffTime = Math.abs(date - REFERENCE_DATE);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const cycleDay = diffDays % 8;
  
  const hour = date.getHours();
  const isNight = hour >= 19 || hour < 7;
  const shiftType = isNight ? 'Night' : 'Morning';

  let morningGroup = '';
  let nightGroup = '';

  // Cycle definition (8 days)
  // Day 0-1: A-M, C-N
  // Day 2-3: B-M, D-N
  // Day 4-5: C-M, A-N
  // Day 6-7: D-M, B-N

  if (cycleDay < 2) {
    morningGroup = 'A'; nightGroup = 'C';
  } else if (cycleDay < 4) {
    morningGroup = 'B'; nightGroup = 'D';
  } else if (cycleDay < 6) {
    morningGroup = 'C'; nightGroup = 'A';
  } else {
    morningGroup = 'D'; nightGroup = 'B';
  }

  return {
    group: isNight ? nightGroup : morningGroup,
    type: shiftType,
    date: date.toISOString().split('T')[0]
  };
};

export const getShiftForDate = (dateString, shiftType) => {
  const date = new Date(dateString);
  const diffTime = Math.abs(date - REFERENCE_DATE);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const cycleDay = diffDays % 8;

  let morningGroup = '';
  let nightGroup = '';

  if (cycleDay < 2) {
    morningGroup = 'A'; nightGroup = 'C';
  } else if (cycleDay < 4) {
    morningGroup = 'B'; nightGroup = 'D';
  } else if (cycleDay < 6) {
    morningGroup = 'C'; nightGroup = 'A';
  } else {
    morningGroup = 'D'; nightGroup = 'B';
  }

  return shiftType === 'Morning' ? morningGroup : nightGroup;
};

