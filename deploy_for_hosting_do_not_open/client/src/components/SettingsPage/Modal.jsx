import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, onClose }) => {
    return ReactDOM.createPortal(
        <div
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: '#fff',
                    padding: '2rem',
                    borderRadius: '10px',
                    minWidth: '300px',
                    position: 'relative'
                }}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default Modal;