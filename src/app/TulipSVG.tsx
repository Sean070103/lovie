import React from 'react';

const TulipSVG = ({ style = {} }) => (
  <svg
    width={36}
    height={88}
    viewBox="0 0 36 88"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    {/* Background stars */}
    <circle cx="6" cy="10" r="1" fill="#fffbe9" />
    <circle cx="30" cy="18" r="0.8" fill="#fffbe9" />
    <circle cx="10" cy="30" r="0.6" fill="#fffbe9" />
    <circle cx="28" cy="8" r="0.9" fill="#fffbe9" />
    <circle cx="20" cy="4" r="0.7" fill="#fffbe9" />
    <circle cx="32" cy="32" r="0.5" fill="#fffbe9" />
    <circle cx="4" cy="38" r="0.7" fill="#fffbe9" />
    {/* Crescent moon */}
    <circle cx="26" cy="10" r="4" fill="#ffe9a7" />
    <circle cx="28" cy="10" r="3" fill="#fffefb" />
    {/* Stem */}
    <rect x="16" y="36" width="4" height="46" rx="2" fill="#6a9a5b"/>
    {/* Left leaf */}
    <path d="M18 60 Q5 70 14 80 Q20 75 18 60" fill="#b7e3a8" stroke="#7cb97b" strokeWidth="1.1"/>
    {/* Right leaf */}
    <path d="M20 68 Q34 76 22 84 Q18 78 20 68" fill="#b7e3a8" stroke="#7cb97b" strokeWidth="1.1"/>
    {/* Tulip flower */}
    <ellipse cx="18" cy="26" rx="12" ry="16" fill="#f7b6d2" stroke="#e47ca6" strokeWidth="2"/>
    <ellipse cx="18" cy="22" rx="6" ry="12" fill="#f08bb7" stroke="#e47ca6" strokeWidth="1.2"/>
    {/* Petal details */}
    <path d="M18 10 Q15 24 18 26 Q21 24 18 10" fill="#f7b6d2" stroke="#e47ca6" strokeWidth="1"/>
    <path d="M12 16 Q16 24 18 21" stroke="#e47ca6" strokeWidth="0.7" fill="none"/>
    <path d="M24 16 Q20 24 18 21" stroke="#e47ca6" strokeWidth="0.7" fill="none"/>
  </svg>
);

export default TulipSVG;
