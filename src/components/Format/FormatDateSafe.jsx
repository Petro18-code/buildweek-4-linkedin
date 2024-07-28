const FormatDateSafe = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return d.toLocaleDateString('it-IT', { year: 'numeric', month: 'long' });
};

export default FormatDateSafe;
