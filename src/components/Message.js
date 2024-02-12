import { useContext, useState } from 'react';
import { MessageContext } from '../pages/store/MessageStore';

export default function Message({ closeModal }) {
  const [message] = useContext(MessageContext);

  return (
    <>
      <div
        className='toast-container position-fixed'
        style={{ top: '40px', right: '15px' }}
      >
        {message.title && (
          <div
            className='toast show'
            role='alert'
            aria-live='assertive'
            aria-atomic='true'
            data-delay='3000'
          >
            <div className={`toast-header text-white bg-${message.type}`}>
              <strong className='me-auto'>{message.title}</strong>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='toast'
                aria-label='Close'
                onClick={closeModal}
              />
            </div>
            <div className='toast-body'>{message.text}</div>
          </div>
        )}
      </div>
    </>
  );
}
