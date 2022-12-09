import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setDate } from '../store/store';
import { Month } from './Month';
import { getMonthName, capitalize } from '../helpers/helper';
import { Confirmation } from './Confirmation';
import { Notification } from './Notification';

export function Calendar() {
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const dispatch = useDispatch();

  const prevHandler = () => dispatch(setDate(currentDate.minus({ months: 1 })));
  const nextHandler = () => dispatch(setDate(currentDate.plus({ months: 1 })));

  return (
    <>
      <div className="calendar">
        <div className="calendar-header">
          <span className="prev hover" onClick={prevHandler}>
            Назад
          </span>
          <span className="current">
            {capitalize(getMonthName(currentDate))} {currentDate.year}
          </span>
          <span className="next hover" onClick={nextHandler}>
            Вперед
          </span>
        </div>
        <div className="calendar-body">
          <Month />
        </div>
      </div>
      <Outlet />
      <Confirmation />
      <Notification />
    </>
  );
}
