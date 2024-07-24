import { format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';

const formatDateSafe = (dateString) => {
  if (typeof dateString !== 'string' || !dateString.trim()) {
    console.error('Invalid dateString:', dateString);
    return 'Data non valida';
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error('Date creation failed:', dateString);
    return 'Data non valida';
  }

  return format(date, 'MMMM yyyy', { locale: it }); 
};

export default formatDateSafe;
