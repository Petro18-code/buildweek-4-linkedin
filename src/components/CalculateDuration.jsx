import { differenceInMonths, differenceInYears } from 'date-fns';

const calculateDuration = (startDate, endDate) => {
 
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Data non valida';
  }

  
  const totalMonths = differenceInMonths(end, start);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  
  return `${years} anni, ${months} mesi`;
};

export default calculateDuration;
