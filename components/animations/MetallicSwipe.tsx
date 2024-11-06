"use client"

import { motion } from "framer-motion";

export const MetallicSwipe = () => {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] pointer-events-none"
      animate={{
        translateX: ["-200%", "200%"],
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    />
  );
};