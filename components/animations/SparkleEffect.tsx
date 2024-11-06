"use client"

import { motion } from "framer-motion";

export const SparkleEffect = () => {
  return (
    <motion.div
      className="absolute top-4 left-4 w-4 h-4"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.2, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 0.5,
        delay: 0.8, // Start near the end of the swipe
        ease: "easeOut",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-full h-full"
      >
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="currentColor"
          className="text-yellow-400"
        />
      </svg>
    </motion.div>
  );
};