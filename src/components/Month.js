import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDaysArray, dayToFormat } from '../helpers/helper';

export function Month() {
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const events = useSelector((state) => state.calendar.events);
  const navigate = useNavigate();

  const days = getDaysArray(currentDate);

  const dayHandler = (day) => {
    if (!day.active) return;
    const dayText = dayToFormat(day.value, currentDate, 'dd-MM-yyyy');
    navigate('/' + dayText);
  };

  const dayClasses = (day) => {
    if (!day.active) return 'day';
    const dayText = dayToFormat(day.value, currentDate, 'dd-MM-yyyy');
    return `day hover ${events[dayText] ? 'bold' : ''}`;
  };

  return (
    <div className="days-wrapper">
      {days.map((day, i) => (
        <div key={i} className={dayClasses(day)} onClick={() => dayHandler(day)}>
          {day.value}
        </div>
      ))}
    </div>
  );
}
