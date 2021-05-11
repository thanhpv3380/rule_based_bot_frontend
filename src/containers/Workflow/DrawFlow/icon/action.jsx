import React from 'react';

export const ActionIcon = (props) => {
  const { style, className, backgroundColor } = props;
  return (
    <svg
      style={style}
      width={52}
      height={52}
      viewBox="0 0 26 26"
      fill="none"
      className={className}
    >
      <rect
        x="1"
        y="1"
        width="24"
        height="24"
        rx="4"
        // fill="#fff"
        fill={backgroundColor || '#fff'}
      />
      <rect
        x="0.5"
        y="0.5"
        width="25"
        height="25"
        rx="4.5"
        // stroke="#101010"
        strokeOpacity="0.08"
      />
      <path
        d="M19.074 11.069h-4.241l3.814-4.819a.155.155 0 00-.122-.25h-7.383a.153.153 0 00-.133.077l-4.988 8.615a.154.154 0 00.133.231h3.358L7.79 21.808c-.036.15.145.256.257.148L19.18 11.333a.153.153 0 00-.106-.264z"
        fill="#BE60EF"
      />
    </svg>
  );
};
