import React from 'react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BrutalCard = ({ children, className, title }: { children: React.ReactNode, className?: string, title?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn("brutal-card p-6 flex flex-col gap-4", className)}
  >
    {title && (
      <div className="border-b-2 border-black/20 pb-2 mb-2">
        <h3 className="text-xs font-black uppercase tracking-widest opacity-50">{title}</h3>
      </div>
    )}
    {children}
  </motion.div>
);

export const GlassPanel = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("glass-panel p-6 rounded-none", className)}>
    {children}
  </div>
);

export const SovietButton = ({ children, className, variant = 'default', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'red' }) => (
  <button 
    className={cn(
      "brutal-btn",
      variant === 'red' && "brutal-btn-red",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export const StatusBadge = ({ active }: { active: boolean }) => (
  <div className="flex items-center gap-2">
    <div className={cn(
      "w-3 h-3 rounded-full",
      active ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" : "bg-red-500 shadow-[0_0_10px_#ef4444]"
    )} />
    <span className="text-[10px] font-bold uppercase tracking-tighter">
      {active ? "System Operational" : "System Offline"}
    </span>
  </div>
);
