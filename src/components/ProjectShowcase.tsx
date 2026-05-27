import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crosshair, Ruler, Grid3x3, Eye, Sliders } from 'lucide-react';
import { PortfolioProject, ThemeType } from '../types';

interface ProjectShowcaseProps {
  project: PortfolioProject;
  theme: ThemeType;
  gridSize: number;
  showRulers: boolean;
  activeAccent: string | null;
}

export default function ProjectShowcase({
  project,
  theme,
  gridSize,
  showRulers,
  activeAccent
}: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Coordinates State for the Active Precision HUD
  const [coords, setCoords] = useState({ x: 0, y: 0, percentX: 50, percentY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Handle coordinates tracking on pointer move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xVal = Math.round(e.clientX - rect.left);
    const yVal = Math.round(e.clientY - rect.top);
    
    // Prevent index bounding overflows
    const clampedX = Math.max(0, Math.min(xVal, rect.width));
    const clampedY = Math.max(0, Math.min(yVal, rect.height));
    
    const pX = (clampedX / rect.width) * 100;
    const pY = (clampedY / rect.height) * 100;
    
    setCoords({
      x: clampedX,
      y: clampedY,
      percentX: pX,
      percentY: pY
    });
  };

  return (
    <div className="w-full relative">
      {/* Precision Rulers / Border Guides */}
      {showRulers && (
        <div className="absolute -inset-4 pointer-events-none z-10 select-none">
          {/* Top Metric Scale */}
          <div className="absolute top-0 left-4 right-4 h-[1px] flex justify-between font-mono-custom text-[9px] opacity-40">
            <span>0px</span>
            <span>25%</span>
            <span>50% // LOBE</span>
            <span>75%</span>
            <span>100% // WIDTH</span>
          </div>
          {/* Left Metric Scale */}
          <div className="absolute left-0 top-4 bottom-4 w-[1px] flex flex-col justify-between items-end pr-1 font-mono-custom text-[8px] opacity-40">
            <span>0 Y</span>
            <span>SEC_A</span>
            <span>SEC_B</span>
            <span>END Y</span>
          </div>
        </div>
      )}

      {/* Main Image Stage */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-full overflow-hidden rounded-2xl transition-all duration-500 shadow-xl border select-none cursor-crosshair group ${
          theme === 'light'
            ? 'bg-slate-100 border-slate-200'
            : 'bg-[#0a0f1e] border-slate-800'
        } ${project.gridAspect}`}
      >
        {/* Animated Image */}
        <motion.img
          key={project.id}
          initial={{ opacity: 0.35, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          alt={project.title}
          src={project.imageUrl}
          className={`w-full h-full object-cover transition-all duration-700 ${
            activeAccent === 'accents' ? 'grayscale-0' : 'grayscale-[0.1] group-hover:grayscale-0'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Gradient Layering Overlay for technical aesthetic (like the dark theme screenshot) */}
        {theme === 'dark' && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-85 pointer-events-none" />
        )}

        {/* Active Grid Overlay representing Discipline Principle */}
        {activeAccent === 'layouts' && (
          <div 
            className="absolute inset-0 pointer-events-none z-15 mix-blend-overlay animate-grid-pulse"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme === 'light' ? 'rgba(79, 70, 229, 0.2)' : 'rgba(59, 130, 246, 0.25)'} 1px, transparent 1px),
                                linear-gradient(to bottom, ${theme === 'light' ? 'rgba(79, 70, 229, 0.2)' : 'rgba(59, 130, 246, 0.25)'} 1px, transparent 1px)`,
              backgroundSize: `${gridSize * 2}px ${gridSize * 2}px`
            }}
          />
        )}

        {/* Dynamic Coordinate Target Overlays for Precision Principle */}
        {(isHovered || activeAccent === 'accents') && (
          <>
            {/* Horizontal Line Indicator */}
            <div 
              className="absolute left-0 right-0 h-[1.5px] pointer-events-none z-20 mix-blend-difference"
              style={{ 
                top: `${coords.percentY}%`,
                backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(59, 130, 246, 0.7)'
              }}
            />
            {/* Vertical Line Indicator */}
            <div 
              className="absolute top-0 bottom-0 w-[1.5px] pointer-events-none z-20 mix-blend-difference"
              style={{ 
                left: `${coords.percentX}%`,
                backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(59, 130, 246, 0.7)'
              }}
            />
            {/* Target Reticle circle */}
            <div 
              className="absolute w-6 h-6 border-2 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 mix-blend-difference"
              style={{ 
                left: `${coords.percentX}%`, 
                top: `${coords.percentY}%`,
                borderColor: theme === 'light' ? '#ffffff' : '#3b82f6',
                boxShadow: '0 0 0 4px rgba(0, 0, 0, 0.2)'
              }}
            />
          </>
        )}

        {/* Floating heads-up HUD box in Mono font showing metrics */}
        <AnimatePresence>
          {(isHovered || activeAccent === 'accents') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-4 left-4 z-30 p-4 rounded-xl font-mono-custom text-[10px] tracking-wide pointer-events-none select-none shadow-lg border flex flex-col gap-1.5 backdrop-blur-md bg-opacity-90 max-w-[200px] md:max-w-none"
              style={{
                backgroundColor: theme === 'light' ? '#ffffff' : '#0a0f1e/90',
                borderColor: theme === 'light' ? '#f1f5f9' : '#1e293b',
                color: theme === 'light' ? '#1e293b' : '#f1f5f9'
              }}
            >
              <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-1.5">
                <Crosshair size={11} className="text-indigo-600 dark:text-blue-400" />
                <span className="font-bold uppercase text-[9px]">Pixel Inspector HUD</span>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                <div>COORD_X:</div>
                <div className="text-right font-semibold">{coords.x}px</div>
                <div>COORD_Y:</div>
                <div className="text-right font-semibold">{coords.y}px</div>
                <div>UNIT_DIV:</div>
                <div className="text-right font-semibold text-emerald-500">
                  {coords.x % gridSize === 0 ? 'TRUE' : `SLIP (${coords.x % gridSize})`}
                </div>
                <div>RATIO:</div>
                <div className="text-right font-semibold">{(coords.percentX / 100).toFixed(3)}x</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Corner Indicator Badges */}
        <div className={`absolute top-4 right-4 z-10 px-2.5 py-1 text-[9px] font-mono-custom tracking-wider rounded-xl border flex items-center gap-1.5 ${
          theme === 'light'
            ? 'bg-white/85 text-slate-800 border-slate-200'
            : 'bg-[#020617]/90 text-slate-200 border-slate-800'
        }`}>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>SYS_GRID:Div({gridSize}px)</span>
        </div>
      </div>

      {/* Selected Project Caption Details */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-custom tracking-widest uppercase opacity-70">
        <span>Year: {project.year}</span>
        <span className="flex items-center gap-1">
          <Eye size={12} />
          {isHovered ? 'Active HUD Inspecting' : 'Hover Visual to Inspect Coordinates'}
        </span>
        <span>{project.category}</span>
      </div>
    </div>
  );
}
