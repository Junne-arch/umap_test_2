"use client"

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TreeCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.top = `${e.clientY}px`;
        cursorRef.current.style.left = `${e.clientX}px`;
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <motion.div 
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28
      }}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        whileHover={{ scale: 1.2 }}
      >
        <motion.path
          d="M12 22V12"
          stroke="#8B4513"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M12 12L9 9M12 12L15 9M12 8L10 6M12 8L14 6"
          stroke="#8B4513"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.path
          d="M12 2L6 10C5.33333 11 5.4 13 8 13H16C18.6 13 18.6667 11 18 10L12 2Z"
          fill="#4CAF50"
          stroke="#2E7D32"
          strokeWidth="1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 500,
            damping: 30,
            delay: 0.4 
          }}
        />
        <motion.path
          d="M10 7C10 7 11 8 12 8C13 8 14 7 14 7"
          stroke="#2E7D32"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default TreeCursor;