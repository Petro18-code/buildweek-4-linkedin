const calculateDuration = (startDate, endDate) => {
  if (!startDate) return 'Durata sconosciuta';
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  return `${diffInMonths} mesi`;
};


export default calculateDuration;
