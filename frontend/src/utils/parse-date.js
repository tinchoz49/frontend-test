import { parse } from 'date-fns';

export default function parseDate(date) {
  const [currentDate, time] = date.split(' ');
  const [MM, DD, YY] = currentDate.split('/');
  const [hh, mm] = time.split(':');
  return parse(`${YY}-${MM}-${DD}T${hh}:${mm}:00`);
}
