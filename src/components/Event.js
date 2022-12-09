import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from './Modal';
import { NoMatch } from './NoMatch';
import { addEvent, updateEvent, confirm, notify, removeEvent } from '../store/store';
import { validateTime, validateNum } from '../helpers/helper';

const validateInputs = (inputs) => {
  return (
    inputs.name &&
    inputs.start &&
    inputs.end &&
    inputs.reminder &&
    validateTime(inputs.start) &&
    validateTime(inputs.end) &&
    validateNum(inputs.reminder)
  );
};

export function Event() {
  const { day, num } = useParams();
  const [inputs, setInputs] = useState({});
  const [mode, setMode] = useState('view');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector((state) => state.calendar.events);
  const dayEvents = events[day] ?? [];
  const event = dayEvents.length >= num && num > 0 ? dayEvents[num - 1] : null;
  const changeHandler = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const invalidInputsConfirm = () => {
    const confirmData = {
      text: 'Неверные данные',
      onOk: () => {
        dispatch(confirm(null));
      },
      onCancel: () => {
        dispatch(confirm(null));
      },
    };
    dispatch(confirm(confirmData));
  };

  const createHandler = () => {
    if (!validateInputs(inputs)) {
      invalidInputsConfirm();
      return;
    }
    dispatch(addEvent({ day, inputs }));
    dispatch(
      notify({
        text: 'Мероприятие успешно создано!',
        onClose: () => {
          dispatch(notify(null));
        },
      })
    );
    setTimeout(() => {
      navigate(`/${day}`);
    }, 0);
  };

  const saveHandler = () => {
    if (!validateInputs(inputs)) {
      invalidInputsConfirm();
      return;
    }
    dispatch(updateEvent({ day, inputs, id: event.id }));
    dispatch(
      notify({
        text: 'Мероприятие сохранено!',
        onClose: () => {
          dispatch(notify(null));
        },
      })
    );
    setTimeout(() => {
      navigate(`/${day}`);
    }, 0);
  };

  if (num === '0' || mode === 'edit') {
    return (
      <Modal submodal="true" style={{ height: '350px' }}>
        <div className="col-container">
          {num === '0' && <h2>Новое мероприятие</h2>}
          {mode === 'edit' && <h2>Мероприятие</h2>}
          <hr />

          <div className="stretch-item">
            <div className="inputs-container">
              <label>
                Название:
                <input
                  className={`${inputs.name && inputs.name.length > 0 ? '' : 'invalid'}`}
                  name="name"
                  autoComplete="off"
                  type="text"
                  value={inputs.name || ''}
                  onChange={changeHandler}
                />
              </label>
              <br />
              <label>
                Время начала:
                <input
                  className={`${validateTime(inputs.start) ? '' : 'invalid'}`}
                  name="start"
                  type="time"
                  value={inputs.start || ''}
                  onChange={changeHandler}
                />
              </label>
              <br />
              <label>
                Время окончания:
                <input
                  className={`${validateTime(inputs.end) ? '' : 'invalid'}`}
                  name="end"
                  type="time"
                  value={inputs.end || ''}
                  onChange={changeHandler}
                />
              </label>
              <br />
              <label>
                За сколько минут напомнить:
                <input
                  className={`${inputs.reminder && validateNum(inputs.reminder) ? '' : 'invalid'}`}
                  name="reminder"
                  type="number"
                  value={inputs.reminder || ''}
                  onChange={changeHandler}
                />
              </label>
            </div>
          </div>

          <hr />
          <div className="buttons-container">
            {num === '0' && (
              <Link className="link" onClick={createHandler}>
                Создать
              </Link>
            )}
            {mode === 'edit' && (
              <Link className="link" onClick={saveHandler}>
                Сохранить
              </Link>
            )}
            <Link className="link" to={`/${day}`}>
              Отмена
            </Link>
          </div>
        </div>
      </Modal>
    );
  }

  if (!event) {
    return <NoMatch />;
  }

  const editHandler = () => {
    setInputs({ ...event });
    setMode('edit');
  };

  const removeHandler = () => {
    const confirmData = {
      text: 'Удалить мероприятие?',
      onOk: () => {
        dispatch(removeEvent({ day, id: event.id }));
        dispatch(confirm(null));
        navigate(`/${day}`);
      },
      onCancel: () => {
        dispatch(confirm(null));
        navigate(`/${day}`);
      },
    };

    dispatch(confirm(confirmData));
  };

  return (
    <Modal submodal="true" style={{ height: '200px' }}>
      <div className="col-container">
        <h2>
          {event.start}-{event.end}: {event.name}
        </h2>
        <hr />

        <div className="stretch-item">
          <div className="reminder-text">Напомнить: за {event.reminder} минут</div>
        </div>

        <hr />
        <div className="buttons-container">
          <Link className="link" onClick={editHandler}>
            Редактировать
          </Link>
          <br />
          <Link className="link" onClick={removeHandler}>
            Удалить
          </Link>
          <br />
          <Link className="link" to={`/${day}`}>
            Закрыть
          </Link>
        </div>
      </div>
    </Modal>
  );
}
