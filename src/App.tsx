import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  ChevronRight, 
  ChevronLeft, 
  Grid3x3, 
  Crosshair, 
  Layers, 
  Sparkles, 
  Sun, 
  Moon, 
  Globe,
  Sliders,
  HelpCircle
} from 'lucide-react';
import { ThemeType, PortfolioProject } from './types';
import { STUDIO_PROJECTS, PHILOSOPHIES } from './data';
import Sidebar from './components/Sidebar';
import ProjectShowcase from './components/ProjectShowcase';

export default function App() {
  // Theme state: default to dark to showcase the full technical bento-grids, or light.
  const [theme, setTheme] = useState<ThemeType>('dark');
  
  // Current active showcased project
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(1); // default to Concept 02 for Dark theme screenshot

  // Sidebar controls
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Grid settings controlled by Sidebar
  const [gridSize, setGridSize] = useState<number>(4); // default 4px grid divider
  const [showRulers, setShowRulers] = useState<boolean>(false);
  const [activeAccent, setActiveAccent] = useState<string | null>(null);

  // Auto-sync initial project selection to match reference screenshots
  // Light mode preselects Concept 01; Dark mode preselects Concept 02 for absolute accuracy
  useEffect(() => {
    if (theme === 'light') {
      setCurrentProjectIndex(0);
    } else {
      setCurrentProjectIndex(1);
    }
  }, [theme]);

  const activeProject = STUDIO_PROJECTS[currentProjectIndex];

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    setActiveAccent(null); // reset interactive accents
  };

  const nextProject = () => {
    setCurrentProjectIndex(prev => (prev + 1) % STUDIO_PROJECTS.length);
    setActiveAccent(null);
  };

  const prevProject = () => {
    setCurrentProjectIndex(prev => (prev - 1 + STUDIO_PROJECTS.length) % STUDIO_PROJECTS.length);
    setActiveAccent(null);
  };

  // Click handler for philosophy / bento cards to trigger live demo overlays
  const handlePhilosophyClick = (tag: string) => {
    const key = tag.toLowerCase();
    if (activeAccent === key) {
      setActiveAccent(null);
    } else {
      setActiveAccent(key);
      if (key === 'layouts') {
        setGridSize(4); // Reset to standard 4px division
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 relative ${
      theme === 'light' 
        ? 'bg-[#f7f9fb] text-[#1e293b] architectural-grid-light' 
        : 'bg-[#020617] text-[#f1f5f9] architectural-grid-dark'
    }`}>
      
      {/* Dynamic Background Elevation level toggles (Luxury matte level indicator) */}
      <AnimatePresence>
        {theme === 'dark' && activeAccent === 'layering' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0a0f1e] mix-blend-multiply pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

      {/* TopAppBar */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-500 ${
        theme === 'light' 
          ? 'bg-[#ffffff]/85 border-slate-200' 
          : 'bg-[#020617]/80 border-slate-800/80'
      }`}>
        <div className="flex justify-between items-center w-full px-6 md:px-12 py-4 max-w-7xl mx-auto h-16 md:h-20">
          
          <div className="flex items-center gap-4">
            {/* Nav Menu Trigger Burger */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`p-2 rounded-lg cursor-pointer transition-all ${
                theme === 'light' 
                  ? 'hover:bg-slate-100 text-[#191c1e]' 
                  : 'hover:bg-slate-800/50 text-blue-400'
              }`}
              title="Open Controller Drawer"
            >
              <Menu size={20} />
            </button>

            {/* Title Branding */}
            {theme === 'light' ? (
              <span className="text-xl md:text-2xl font-bold tracking-tighter text-[#1a146b]">
                Studio Metz
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <span className="text-white font-bold text-sm">Ω</span>
                </div>
                <span className="font-display text-lg md:text-xl font-black uppercase tracking-widest text-slate-100 bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-slate-200 to-blue-400">
                  STUDIO METZ
                </span>
              </div>
            )}
          </div>

          {/* Action Tools & profile headshot */}
          <div className="flex items-center gap-4">
            {/* Quick Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono-custom tracking-wider uppercase border transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                  : 'bg-[#0a0f1e] border-slate-800 text-slate-200 hover:bg-slate-900/50'
              }`}
              title="Switch Themes"
            >
              {theme === 'light' ? (
                <>
                  <Moon size={11} className="text-indigo-600" />
                  <span>Obsidian Mode</span>
                </>
              ) : (
                <>
                  <Sun size={11} className="text-blue-400" />
                  <span>Daylight Mode</span>
                </>
              )}
            </button>

            {/* Config Sandbox Trigger button */}
            <button
              onClick={() => {
                setIsSidebarOpen(true);
              }}
              className={`p-2 rounded-lg cursor-pointer transition-colors hidden md:block ${
                theme === 'light' ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-slate-800/40 text-slate-300'
              }`}
              title="Open Settings Console"
            >
              <Sliders size={18} />
            </button>

            {/* Profile Avatar with status indicator ring */}
            <div 
              onClick={toggleTheme}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full border-2 cursor-pointer overflow-hidden transition-transform hover:scale-105 relative ${
                theme === 'light' ? 'border-indigo-600' : 'border-blue-500/80 shadow-md shadow-blue-500/10'
              }`}
              title="Click Avatar to Toggle Theme"
            >
              <img 
                alt="Studio Metz Creative Director" 
                className="w-full h-full object-cover select-none"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEBJyIB-tohARLYLckMs88d5Nwkim0tD9BpsifAvX1fczwRy_Iw_EcSs_NR389SXH3Rl8bWxe4SMagRI_ewfCWkTBCoMDGe2ipVIVrfgDPQrYlLgxACvmF4Xj8DGg3QywvY5-VsSD6bERxi7G1Z-K-xA5shJd5E82QnvJ6g6VaJkDxuYLJUWPMzFyqu_GH78OnnME4ZR8dDi97u7LdLxPXxRASAoaIAeWffMaTpZV4sOmL7yAub8nJ5eFd69zHOeH0xjJNp0piCcU"
                referrerPolicy="no-referrer"
              />
              {/* Soft online status dot */}
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Stage */}
      <main className="flex-grow z-10">
        
        {/* Project Selector Indicator Ribbon */}
        <section className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/60 pb-3">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono-custom text-[9px] tracking-widest uppercase opacity-50 text-slate-400">
                Active Art Block
              </span>
              <span className="text-xs font-bold font-mono-custom tracking-wider text-indigo-600 dark:text-blue-400">
                Concept 0{currentProjectIndex + 1} // {activeProject.title}
              </span>
            </div>

            {/* Pagination Sliders */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevProject}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  theme === 'light' 
                    ? 'hover:bg-slate-100 border-slate-200 text-slate-800' 
                    : 'hover:bg-slate-800/45 border-slate-800 text-slate-200'
                }`}
                title="Previous Concept"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={nextProject}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  theme === 'light' 
                    ? 'hover:bg-slate-100 border-slate-200 text-slate-800' 
                    : 'hover:bg-slate-800/45 border-slate-800 text-slate-200'
                }`}
                title="Next Concept"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Hero Image Container */}
        <section className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-6 md:pt-10">
          <ProjectShowcase
            project={activeProject}
            theme={theme}
            gridSize={gridSize}
            showRulers={showRulers}
            activeAccent={activeAccent}
          />
        </section>

        {/* Brand Narrative Section */}
        <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            <div className="md:col-span-8">
              <motion.h1 
                key={`${theme}-${activeProject.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-800 dark:text-slate-100 leading-[1.1] mb-6 md:mb-8"
              >
                Shaping the Future of <br className="hidden md:block"/>Digital Experiences
              </motion.h1>

              <div className="space-y-6 max-w-3xl">
                <p className={`text-base md:text-lg leading-relaxed ${
                  theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  We specialize in crafting architectural digital interfaces for brands that demand precision and understated luxury. Our approach treats every pixel as a structural element, ensuring that clarity, intentionality, and aesthetic excellence remain at the core of your digital identity.
                </p>
                <p className={`text-base md:text-lg leading-relaxed ${
                  theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  By leveraging a philosophy of minimalist discipline, we elevate product experiences into moments of pure visual harmony.
                </p>
              </div>

              {/* Decorative Accent (Architectural precision line matching Light screenshot) */}
              <div className="mt-12 md:mt-16 w-32 h-[1px] bg-indigo-600 dark:bg-blue-500" />
            </div>

            {/* Quick Stats sidebar detailing design specs */}
            <div className={`md:col-span-4 p-6 rounded-2xl border text-xs font-mono-custom space-y-3 ${
              theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0a0f1e] border-slate-800'
            }`}>
              <div className="font-bold border-b border-slate-200 dark:border-slate-800 pb-1.5 uppercase opacity-80 text-indigo-600 dark:text-blue-400">
                METRIC SPECIFICATION
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>PROJECT ID:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{activeProject.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>BASEUNIT:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{gridSize}px GRID</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>RULERS_GEOM:</span>
                <span className="font-medium text-emerald-500">{showRulers ? 'ACTIVE' : 'STANDBY'}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>OVERLAY_MODE:</span>
                <span className="font-medium text-amber-500">{activeAccent ? activeAccent.toUpperCase() : 'NONE'}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                <span className="opacity-70 text-[10px] text-slate-400">METZ GRID CONTROLLER:</span>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className={`w-full py-2.5 hover:opacity-90 rounded-xl font-bold uppercase tracking-wider text-center cursor-pointer transition-all ${
                    theme === 'light' ? 'bg-indigo-600 text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/10'
                  }`}
                >
                  Adjust Framework Size
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Technical Detail Grid (Bento Style) - Rendered as large cards matching dark theme screenshot! */}
        <section className={`w-full transition-colors duration-500 ${
          theme === 'light' ? 'bg-slate-50' : 'bg-[#0a0f1e]/40 border-t border-slate-800/50'
        }`}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="mb-10 flex flex-col gap-1">
              <span className="font-mono-custom text-[11px] tracking-widest text-indigo-600 dark:text-blue-400 uppercase">
                Metz System Core Rules
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Our Architectural Principles</h2>
              <p className={`text-sm max-w-2xl mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                Click on any card to trigger its corresponding dynamic coordinate overlay onto the master visual canvas above.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PHILOSOPHIES.map((phi) => {
                const isSelected = activeAccent === phi.tag.toLowerCase();
                return (
                  <div
                    key={phi.tag}
                    onClick={() => handlePhilosophyClick(phi.tag)}
                    className={`p-8 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col gap-4 text-left relative overflow-hidden group ${
                      isSelected
                        ? (theme === 'light' 
                            ? 'bg-gradient-to-tr from-indigo-700 to-indigo-600 border-transparent text-white shadow-lg shadow-indigo-500/20' 
                            : 'bg-[#a3e635]/0 bg-gradient-to-tr from-blue-600/90 to-indigo-600/90 border-blue-500 text-slate-100 shadow-lg shadow-blue-500/20')
                        : (theme === 'light'
                            ? 'bg-white border-slate-200 hover:border-indigo-600/40 text-slate-800'
                            : 'bg-[#0a0f1e] border-slate-800/80 hover:border-blue-500/40 text-slate-200')
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`font-mono-custom text-[11px] uppercase tracking-widest font-bold ${
                        isSelected 
                          ? 'text-blue-100'
                          : 'text-indigo-600 dark:text-blue-400'
                      }`}>
                        {phi.tag}
                      </span>
                      
                      {phi.tag === 'DISCIPLINE' && <Grid3x3 size={18} className={isSelected ? 'text-white' : 'opacity-50'} />}
                      {phi.tag === 'PRECISION' && <Crosshair size={18} className={isSelected ? 'text-white' : 'opacity-50'} />}
                      {phi.tag === 'LUXURY' && <Layers size={18} className={isSelected ? 'text-white' : 'opacity-50'} />}
                    </div>

                    <div className="space-y-1.5 flex-grow">
                      <h3 className="text-xl font-bold tracking-tight">{phi.title}</h3>
                      <p className={`text-xs font-mono-custom uppercase tracking-wider font-medium ${
                        isSelected ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {phi.headline}
                      </p>
                    </div>

                    <p className={`text-xs leading-relaxed ${
                      isSelected ? 'text-slate-100' : 'text-slate-600 dark:text-slate-300'
                    }`}>
                      {phi.description}
                    </p>

                    <div className="pt-2 flex items-center gap-1.5 text-[10px] font-mono-custom font-semibold uppercase tracking-wider">
                      <span className={isSelected ? 'text-white' : 'text-indigo-600 dark:text-blue-400'}>
                        {isSelected ? '■ Mode Engaged' : '► Demo Mode'}
                      </span>
                    </div>

                    {/* Subtle geometric line effect in background */}
                    <div className={`absolute bottom-0 right-0 w-24 h-24 border-b border-r rounded-br pointer-events-none transition-opacity duration-300 ${
                      isSelected ? 'opacity-25 border-white' : 'opacity-0 border-slate-800'
                    }`} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className={`border-t transition-colors duration-500 ${
        theme === 'light' 
          ? 'bg-white border-slate-200' 
          : 'bg-[#020617] border-slate-800'
      }`}>
        <div className="flex flex-col items-center justify-center w-full py-16 px-6 max-w-7xl mx-auto space-y-6 text-center">
          
          <div className="font-mono-custom text-xs tracking-widest uppercase opacity-55">
            STUDIO METZ
          </div>
          
          <div className="font-mono-custom text-[11px] uppercase tracking-widest opacity-60">
            © STUDIO METZ MMXXIV
          </div>

          {/* Social Links as text, as per navigation constraints */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-4 text-[10px] font-mono-custom font-bold tracking-widest">
            <span className="hover:text-indigo-600 dark:hover:text-blue-400 text-slate-500 transition-colors cursor-pointer uppercase">
              INSTAGRAM
            </span>
            <span className="hover:text-indigo-600 dark:hover:text-blue-400 text-slate-500 transition-colors cursor-pointer uppercase">
              LINKEDIN
            </span>
            <span className="hover:text-indigo-600 dark:hover:text-blue-400 text-slate-500 transition-colors cursor-pointer uppercase">
              TWITTER
            </span>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 w-full max-w-[200px] mx-auto">
            <p className="text-[9px] font-mono-custom opacity-40">
              COORDS // 48.8566 N, 2.3522 E
            </p>
          </div>

        </div>
      </footer>

      {/* Slide-out Sidebar Workspace Controller */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        theme={theme}
        gridSize={gridSize}
        setGridSize={setGridSize}
        showRulers={showRulers}
        setShowRulers={setShowRulers}
        activeAccent={activeAccent}
        setActiveAccent={setActiveAccent}
      />

    </div>
  );
}
