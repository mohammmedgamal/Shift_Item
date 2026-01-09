/**
 * SEC 12-hour shift rotation logic for 4 groups (A, B, C, D)
 * 8-day cycle example
 */

const GROUPS = ['A', 'B', 'C', 'D'];
const REFERENCE_DATE = new Date('2025-01-15'); // Reference start date

export const getCurrentShift = (date = new Date()) => {
  const diffTime = date - REFERENCE_DATE;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Handle dates before reference if necessary (positive modulo)
  const cycleDay = ((diffDays % 16) + 16) % 16;
  
  const hour = date.getHours();
  const isNight = hour >= 19 || hour < 7;
  const shiftType = isNight ? 'Night' : 'Morning';

  let morningGroup = '';
  let nightGroup = '';

  /**
   * 16-day cycle pattern:
   * Days 0-3: A-M, B-N
   * Days 4-7: D-M, C-N
   * Days 8-11: B-M, A-N
   * Days 12-15: C-M, D-N
   */

  if (cycleDay < 4) {
    morningGroup = 'A'; nightGroup = 'B';
  } else if (cycleDay < 8) {
    morningGroup = 'D'; nightGroup = 'C';
  } else if (cycleDay < 12) {
    morningGroup = 'B'; nightGroup = 'A';
  } else {
    morningGroup = 'C'; nightGroup = 'D';
  }

  return {
    group: isNight ? nightGroup : morningGroup,
    type: shiftType,
    date: date.toISOString().split('T')[0]
  };
};

export const getShiftForDate = (dateString, shiftType) => {
  const date = new Date(dateString);
  const diffTime = date - REFERENCE_DATE;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const cycleDay = ((diffDays % 16) + 16) % 16;

  let morningGroup = '';
  let nightGroup = '';

  if (cycleDay < 4) {
    morningGroup = 'A'; nightGroup = 'B';
  } else if (cycleDay < 8) {
    morningGroup = 'D'; nightGroup = 'C';
  } else if (cycleDay < 12) {
    morningGroup = 'B'; nightGroup = 'A';
  } else {
    morningGroup = 'C'; nightGroup = 'D';
  }

  return shiftType === 'Morning' ? morningGroup : nightGroup;
};

