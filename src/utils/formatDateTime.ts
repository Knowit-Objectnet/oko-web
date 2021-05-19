import { format, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale';

export const formatDate = (date: string): string => format(parseISO(date), 'd. MMM yyyy', { locale: nb });
export const formatTime = (date: string): string => format(parseISO(date), 'HH:mm', { locale: nb });
