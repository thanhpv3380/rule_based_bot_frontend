import React from 'react';

export const ConditionIcon = (props) => {
  const { style, className, backgroundColor } = props;
  return (
    <svg
      style={style}
      width="52"
      height="52"
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
        d="M10.375 19.68c0 .355.203.64.512.64h4.1a.637.637 0 00.636-.64v-3.92h-5.248v3.92zM20.361 6H5.637a.64.64 0 00-.55.96l5.288 7.52h5.248l5.292-7.52a.642.642 0 00-.554-.96z"
        fill="#45C195"
      />
    </svg>
  );
};
