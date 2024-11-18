import { format, parseISO } from 'date-fns'; 

// 2024-11-17T01:07:57.784939 to 17/11/2024
const date = (value: string) => {
  const date = parseISO(value);
  return format(date, 'dd/MM/yyyy');
}

// 2024-11-17T01:07:57.784939 to 17/11/2024 01:07:57
const dateTime = (value: string) => {
  const date = parseISO(value);
  return format(date, 'dd/MM/yyyy HH:mm:ss');
}

export default {
  date,
  dateTime
}