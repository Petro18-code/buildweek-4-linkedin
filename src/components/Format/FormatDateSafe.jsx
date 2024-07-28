const FormatDateSafe = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return d.toLocaleDateString('it-IT', { year: 'numeric', month: 'long' });
};


<<<<<<< HEAD
export default FormatDateSafe;
=======
export default FormatDateSafe;
>>>>>>> origin/modifichegenerali
