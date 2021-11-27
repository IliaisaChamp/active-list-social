import { format, formatDistanceToNow } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy' ,{ locale: ruLocale });
}

export function fDateTime(date) {

  return format(new Date(date), 'dd MMM yyyy HH:mm', { locale: ruLocale });
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ruLocale
  });
}
