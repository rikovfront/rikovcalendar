import { DateTime, Info } from 'luxon';

// Объект дня
export const getDayObject = (value, active) => ({ value, active });

// Объект мероприятия
export const getEventObject = (name, start, end, reminder) => ({ name, start, end, reminder });

// Первый день месяца
export const getFirstDayOfMonth = (dt) => DateTime.fromObject({ year: dt.year, month: dt.month, day: 1 }).weekday;

// Название месяца
export const getMonthName = (dt) => Info.months('long')[dt.month - 1];

// Название дня недели
export const getWeekName = (num) => Info.weekdays('short')[num];

// Массив дней недели
export const weekDays = [...Array(7).keys()].map((i) => getDayObject(getWeekName(i), false));

// Массив объектов дней для месяца
export const getDaysArray = (dt) => {
  const emptyDays = [...Array(getFirstDayOfMonth(dt) - 1)].map((i) => getDayObject('', false));
  const monthDays = [...Array(dt.endOf('month').day).keys()].map((i) => getDayObject(i + 1 + '', true));
  return [...weekDays, ...emptyDays, ...monthDays];
};

// День даты в нужный формат
export const dayToFormat = (day, date, format) =>
  DateTime.fromObject({ year: date.year, month: date.month, day }).toFormat(format);

// Получить объект из localStorage по ключу
export const fromLS = (key) => JSON.parse(localStorage.getItem(key));

// Поместить объект в localStorage по ключу
export const toLS = (key, obj) => localStorage.setItem(key, JSON.stringify(obj));

// Первую букву сделать заглавной
export const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

// Сгененировать id
export const genID = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

// validate time
export const validateTime = (time) => /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time);

// validate num
export const validateNum = (num) => /^[0-9]*$/.test(num);