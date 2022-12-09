import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';

export function NoMatch() {
  return (
    <Modal>
      <h2>Неверная ссылка</h2>
      <Link to={`/`}>Вернуться на главную</Link>
    </Modal>
  );
}
