import { useParams, Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Modal } from './Modal';
import { NoMatch } from './NoMatch';

export function Day() {
  const { day } = useParams();
  const events = useSelector((state) => state.calendar.events);
  const dayEvents = events[day] ?? [];

  if (!day) {
    return <NoMatch />;
  }

  return (
    <>
      <Modal>
        <div className="col-container">
          <h2>{day}</h2>
          <hr />

          <div className="stretch-item">
            <ul className="events-list">
            {dayEvents.map((event, i) => (
              <li key={event.id}>
                <Link className="link" to={`/${day}/${i + 1}`}>
                  {event.start}-{event.end}: {event.name}
                </Link>
              </li>
            ))}
            </ul>
          </div>

          <hr />
          <div className="buttons-container">
            <Link className="link" to={`/${day}/0`}>
              Добавить
            </Link>
            <Link className="link" to={`/`}>
              Закрыть
            </Link>
          </div>
        </div>
      </Modal>
      <Outlet />
    </>
  );
}
