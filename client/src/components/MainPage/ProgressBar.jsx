import React from 'react';

const ProgressBar = ({ value, goal }) => {
    const progress = Math.min(value / goal, 1);
    return (
        <div style={{
            width: '100%',
            height: 24,
            background: '#eee',
            borderRadius: 12,
            overflow: 'hidden',
            margin: '16px 0'
        }}>
            <div style={{
                width: `${progress * 100}%`,
                height: '100%',
                background: progress < 1 ? '#2638BF' : '#2ecc40',
                transition: 'width 0.4s',
                borderRadius: 12
            }} />
        </div>
    );
};

export default ProgressBar;