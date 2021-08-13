import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

export const formatDate = (date: Date): string => format(date, 'd. MMM yyyy', { locale: nb });
export const formatTime = (date: Date): string => format(date, 'HH:mm', { locale: nb });
