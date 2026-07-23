import React from 'react';
import { motion } from 'framer-motion';

export default function Logo({ className = "w-32 h-32" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Glowing filter */}
      <defs>
        <filter id="logo-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Draw path */}
      <motion.path
        d="M20,100 V20 L60,60 L100,20 V100 M100,20 H140 C165,20 165,60 140,60 H110 M140,60 C175,60 175,100 140,100 H100"
        stroke="url(#logo-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#logo-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="rgb(99,179,237)" />
          <stop offset="50%"  stopColor="rgb(167,139,250)" />
          <stop offset="100%" stopColor="rgb(52,211,153)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
