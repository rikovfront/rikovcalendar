import { useSelector } from 'react-redux';

export function Confirmation() {
  const confirmData = useSelector((state) => state.calendar.confirmData);

  return (
    <>
      {confirmData && (
        <>
          <div className="overlay"></div>
          <div className="confirm-container">
            <div className="col-container">
              <h2>{confirmData.text}</h2>
              <div className="stretch-item"></div>
              <div className="buttons-container">
                <button className="link" onClick={confirmData.onOk}>
                  Да
                </button>
                <button className="link" onClick={confirmData.onCancel}>
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
