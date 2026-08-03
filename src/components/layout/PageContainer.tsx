import React from 'react';
import { motion } from 'motion/react';
import { useUIStore } from '../../stores/useUIStore';
import { cn } from '../../utils/cn';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  const { isSidebarCollapsed } = useUIStore();

  return (
    <div
      className={cn(
        'min-h-screen pt-20 pb-12 px-6 sm:px-8 transition-all duration-300',
        isSidebarCollapsed ? 'ml-20' : 'ml-64'
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn('max-w-7xl mx-auto space-y-8', className)}
      >
        {children}
      </motion.div>
    </div>
  );
};
