import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { DateTime } from 'luxon';
import { notify, markAsRead } from '../store/store';

export function Observer() {
  const events = useSelector((state) => state.calendar.events);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = DateTime.now();
      const nowFormatted = now.toFormat('dd-MM-yyyy');

      if (!(events[nowFormatted] && events[nowFormatted].length > 0)) return;

      for (const event of events[nowFormatted]) {
        if (event.read) continue;
        const startNumbers = event.start.split(':');
        if (startNumbers.length !== 2) continue;

        const eventDate = DateTime.fromObject({
          year: now.year,
          month: now.month,
          day: now.day,
          hour: startNumbers[0],
          minute: startNumbers[1],
        });

        const diff = eventDate.diff(now, 'minutes').minutes;

        if (diff < Number(event.reminder) && diff > 0) {
          dispatch(
            notify({
              text: `${event.start}-${event.end}: ${event.name}`,
              onClose: () => {
                dispatch(markAsRead({ day: nowFormatted, id: event.id }));
                dispatch(notify(null));
              },
            })
          );
        }
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [events]);

  return null;
}
