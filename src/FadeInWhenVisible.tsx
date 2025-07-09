import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

const variants = {
  up: { y: 40, opacity: 0 },
  down: { y: -40, opacity: 0 },
  left: { x: -40, opacity: 0 },
  right: { x: 40, opacity: 0 },
  visible: { x: 0, y: 0, opacity: 1 },
};

export const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({ children, direction = 'up', delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={inView ? { ...variants.visible, transition: { duration: 0.8, delay } } : variants[direction]}
      transition={{ type: 'spring', stiffness: 60, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}; 