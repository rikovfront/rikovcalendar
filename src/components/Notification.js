import { useSelector } from 'react-redux';

export function Notification() {
  const notificationData = useSelector((state) => state.calendar.notificationData);

  return (
    <>
      {notificationData && (
        <>
          <div className="notify-container" onClick={notificationData.onClose}>
            <h2>{notificationData.text}</h2>
          </div>
        </>
      )}
    </>
  );
}
