import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sliders, FileText, CheckCircle, Info } from 'lucide-react';
import { InquiryFormState, ThemeType } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeType;
  gridSize: number;
  setGridSize: (size: number) => void;
  showRulers: boolean;
  setShowRulers: (show: boolean) => void;
  activeAccent: string | null;
  setActiveAccent: (accent: string | null) => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  theme,
  gridSize,
  setGridSize,
  showRulers,
  setShowRulers,
  activeAccent,
  setActiveAccent
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'consult' | 'config' | 'philosophy'>('consult');
  
  // Design Inquiry Form State
  const [form, setForm] = useState<InquiryFormState>({
    fullName: '',
    emailAddress: '',
    companyName: '',
    projectDescription: '',
    interestArea: 'layouts'
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (formError) setFormError('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.emailAddress || !form.projectDescription) {
      setFormError('Please fill out all required fields.');
      return;
    }
    
    if (!form.emailAddress.includes('@')) {
      setFormError('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);
    // Simulate luxury slow network response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setForm({
      fullName: '',
      emailAddress: '',
      companyName: '',
      projectDescription: '',
      interestArea: 'layouts'
    });
    setIsSubmitted(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed right-0 top-0 bottom-0 z-[101] w-full max-w-lg shadow-2xl flex flex-col ${
              theme === 'light' 
                ? 'bg-white text-slate-800 border-l border-slate-200' 
                : 'bg-[#020617] text-slate-100 border-l border-slate-800/80'
            }`}
          >
            {/* Header */}
            <div className={`p-6 flex justify-between items-center border-b ${
              theme === 'light' ? 'border-slate-100' : 'border-slate-800/80'
            }`}>
              <div className="flex flex-col">
                <span className="font-mono-custom text-[11px] font-semibold tracking-widest text-indigo-600 dark:text-blue-400 uppercase">
                  Studio Metz Workspace
                </span>
                <span className="text-xl font-bold tracking-tight">Studio Controller</span>
              </div>
              <button 
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${
                  theme === 'light' 
                    ? 'hover:bg-slate-100/80' 
                    : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className={`flex border-b text-xs font-semibold uppercase tracking-wider ${
              theme === 'light' ? 'border-slate-100' : 'border-slate-800/80'
            }`}>
              <button
                onClick={() => setActiveTab('consult')}
                className={`flex-1 py-4 flex items-center justify-center gap-2 border-b-2 transition-all ${
                  activeTab === 'consult'
                    ? (theme === 'light' ? 'border-indigo-600 text-indigo-600' : 'border-blue-500 text-blue-400')
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <FileText size={14} />
                Bespoke Consultation
              </button>
              <button
                onClick={() => setActiveTab('config')}
                className={`flex-1 py-4 flex items-center justify-center gap-2 border-b-2 transition-all ${
                  activeTab === 'config'
                    ? (theme === 'light' ? 'border-indigo-600 text-indigo-600' : 'border-blue-500 text-blue-400')
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Sliders size={14} />
                Grid Configurator
              </button>
              <button
                onClick={() => setActiveTab('philosophy')}
                className={`flex-1 py-4 flex items-center justify-center gap-2 border-b-2 transition-all ${
                  activeTab === 'philosophy'
                    ? (theme === 'light' ? 'border-indigo-600 text-indigo-600' : 'border-blue-500 text-blue-400')
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Info size={14} />
                Metz Ethos
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8">
               {activeTab === 'consult' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight mb-2">Request Architectural Consultation</h3>
                    <p className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-300'} leading-relaxed`}>
                      Partner with our digital space architects to project precision, modular harmony, and structural luxury onto your active branding campaigns.
                    </p>
                  </div>

                  {isSubmitted ? (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`p-6 rounded-2xl text-center space-y-4 ${
                        theme === 'light' ? 'bg-slate-50 border border-slate-100' : 'bg-[#0a0f1e] border border-slate-800'
                      }`}
                    >
                      <div className="flex justify-center">
                        <CheckCircle className="text-emerald-500" size={48} />
                      </div>
                      <h4 className="text-md font-bold uppercase tracking-widest text-[#5654a8] dark:text-blue-400">Inquiry Recorded</h4>
                      <p className={`text-xs ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        A Senior Design Strategist at Studio Metz will analyze your project description and contact you within 24 UTC hours.
                      </p>
                      <button
                        onClick={resetForm}
                        className={`text-xs font-semibold underline hover:opacity-85 text-indigo-600 dark:text-blue-400`}
                      >
                        Submit Another Request
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {formError && (
                        <div className="p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl font-medium">
                          {formError}
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold uppercase tracking-widest opacity-80 text-slate-500 dark:text-slate-400">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Lawrence Metz"
                          className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 ${
                            theme === 'light'
                              ? 'bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:ring-indigo-600'
                              : 'bg-[#070c1b] border border-slate-800/80 focus:border-blue-500 focus:ring-blue-500'
                          }`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold uppercase tracking-widest opacity-80 text-slate-500 dark:text-slate-400">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="emailAddress"
                          value={form.emailAddress}
                          onChange={handleInputChange}
                          placeholder="e.g. lawrence@metz.design"
                          className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 ${
                            theme === 'light'
                              ? 'bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:ring-indigo-600'
                              : 'bg-[#070c1b] border border-slate-800/80 focus:border-blue-500 focus:ring-blue-500'
                          }`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold uppercase tracking-widest opacity-80 text-slate-500 dark:text-slate-400">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={form.companyName}
                          onChange={handleInputChange}
                          placeholder="e.g. Metz & Associate"
                          className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 ${
                            theme === 'light'
                              ? 'bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:ring-indigo-600'
                              : 'bg-[#070c1b] border border-slate-800/80 focus:border-blue-500 focus:ring-blue-500'
                          }`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold uppercase tracking-widest opacity-80 text-slate-500 dark:text-slate-400">
                          Primary Area of Strategic Interest
                        </label>
                        <select
                          name="interestArea"
                          value={form.interestArea}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2.5 rounded-xl text-sm cursor-pointer transition-all focus:outline-none focus:ring-1 ${
                            theme === 'light'
                              ? 'bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:ring-indigo-600 text-slate-800'
                              : 'bg-[#070c1b] border border-slate-800/80 focus:border-blue-500 focus:ring-blue-500 text-slate-200'
                          }`}
                        >
                          <option value="layouts">Architectural & Grid Layouts (Discipline)</option>
                          <option value="accents">Functional Vector Accents (Precision)</option>
                          <option value="layering">Depth & Matte Tonal Layering (Luxury)</option>
                          <option value="general">Bespoke Full-Stack Interface Overhaul</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold uppercase tracking-widest opacity-80 text-slate-500 dark:text-slate-400">
                          Brief Digital Space Description *
                        </label>
                        <textarea
                          name="projectDescription"
                          value={form.projectDescription}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Outline the interface constraints, texture requirements, and spatial requirements..."
                          className={`w-full px-4 py-2.5 rounded-xl text-sm resize-none transition-all focus:outline-none focus:ring-1 ${
                            theme === 'light'
                              ? 'bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:ring-indigo-600'
                              : 'bg-[#070c1b] border border-slate-800/80 focus:border-blue-500 focus:ring-blue-500'
                          }`}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full mt-2 py-3 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          theme === 'light'
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-slate-400'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white disabled:bg-slate-800'
                        }`}
                      >
                        {isSubmitting ? (
                          'Establishing Line Integrals...'
                        ) : (
                          <>
                            <Send size={14} />
                            Send Architectural Intent
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {activeTab === 'config' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight mb-2">Architectural Grid Sandbox</h3>
                    <p className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-300'} leading-relaxed`}>
                      Tweak the core grid rules that structural layout rendering systems use inside Studio Metz. Toggle diagnostic visual tools directly.
                    </p>
                  </div>

                  <div className={`p-5 rounded-2xl border space-y-4 ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0a0f1e] border-slate-800'
                  }`}>
                    {/* Grid Size Control */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold uppercase tracking-widest opacity-85 text-slate-500 dark:text-slate-400">Baseline Step Unit</span>
                        <span className="font-mono-custom text-indigo-600 dark:text-blue-400 font-bold">{gridSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="24"
                        step="1"
                        value={gridSize}
                        onChange={(e) => setGridSize(parseInt(e.target.value))}
                        className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${
                          theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'
                        }`}
                        style={{
                          accentColor: theme === 'light' ? '#4f46e5' : '#3b82f6'
                        }}
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono-custom">
                        <span>2px [Strict]</span>
                        <span>12px [Standard]</span>
                        <span>24px [Spacious]</span>
                      </div>
                    </div>

                    {/* Ruler Guide Checkbox */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800/80">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-widest opacity-85 text-slate-500 dark:text-slate-400">Vector Alignment Rulers</span>
                        <span className="text-[10px] text-slate-400">Show dynamic geometric baseline ticks</span>
                      </div>
                      <button
                        onClick={() => setShowRulers(!showRulers)}
                        className={`w-11 h-6 rounded-full transition-colors relative ${
                          showRulers
                            ? (theme === 'light' ? 'bg-indigo-600' : 'bg-blue-500')
                            : 'bg-slate-300 dark:bg-slate-800'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-transform ${
                          showRulers ? 'translate-x-[20px]' : ''
                        }`} />
                      </button>
                    </div>

                    {/* Theme Overlay Focus Option */}
                    <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800/80">
                      <span className="text-xs font-semibold uppercase tracking-widest opacity-85 block text-slate-500 dark:text-slate-400">Highlight Principle</span>
                      <div className="grid grid-cols-3 gap-2">
                        {['layouts', 'accents', 'layering'].map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setActiveAccent(activeAccent === mode ? null : mode)}
                            className={`py-2 px-1 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all border ${
                              activeAccent === mode
                                ? (theme === 'light' ? 'bg-indigo-600 text-white border-transparent' : 'bg-gradient-to-tr from-blue-600 to-indigo-505 bg-blue-500 text-white border-transparent shadow-md shadow-blue-500/10')
                                : (theme === 'light' ? 'bg-transparent text-slate-700 border-slate-200 hover:bg-slate-100' : 'bg-transparent text-slate-300 border-slate-800 hover:bg-slate-800/40')
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs opacity-75">
                    <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Engineered Constraints</h4>
                    <ul className="list-disc pl-4 space-y-1 font-mono-custom text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                      <li>Widescreen Target: 1280px Grid Limit</li>
                      <li>Interpolation: Sub-pixel Antialiasing Active</li>
                      <li>Viewport: Fluid aspect scaling [1.49x]</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'philosophy' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight mb-2">Pillars of Architectural Art</h3>
                    <p className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-300'} leading-relaxed`}>
                      At Studio Metz, we treat computing devices not merely as plastic screens, but as galleries of mathematical order.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-blue-400">01 // Rigid Discipline</h4>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        We reject arbitrary margins. All spacing must be divisible by our base unit value, anchoring navigation headers, titles, and body loops safely into structural rows.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-blue-400">02 // Pixel-Perfect Precision</h4>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        Visual lines are treated with mechanical respect. Guidance lines exist purely to facilitate effortless cognitive routing, reducing user eye strain during heavy design browsing.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-blue-400">03 // Matte Tonal Luxury</h4>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        Physical light doesn't cast synthetic gradients inside digital workspaces. True luxury emerges from pristine boundaries, matte overlays, and carefully distributed negative space.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex justify-center text-center">
                    <p className="text-[10px] font-mono-custom tracking-widest text-slate-400 opacity-60">
                      STUDIO METZ • MMXXIV
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
