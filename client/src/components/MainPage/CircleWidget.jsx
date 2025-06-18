import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';

const getProgressColor = (progress) => {
    const green = Math.round(128 + 127 * progress);
    const red = Math.round(200 - 200 * progress);
    return `rgb(${red},${green},100)`;
};

const CircularProgress = ({ value, goal, icon }) => {
    const radius = 92;
    const stroke = 16;
    const normalizedRadius = radius;
    const circumference = 2 * Math.PI * normalizedRadius;
    const progress = Math.min(value / goal, 1);
    const strokeDashoffset = circumference * (1 - progress);
    const color = getProgressColor(progress);

    return (
        <div style={{ position: 'relative', width: 200, height: 200 }}>
            <svg height={200} width={200}>
                <circle
                    stroke="#eee"
                    fill="none"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={100}
                    cy={100}
                />
                <circle
                    stroke={color}
                    fill="none"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    r={normalizedRadius}
                    cx={100}
                    cy={100}
                />
            </svg>
            <span style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 64,
                color: {color}
            }}>
                <FontAwesomeIcon icon={fa[icon]} />
            </span>
        </div>
    );
};

export default CircularProgress;