import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Scissors, 
  Maximize2, 
  Palette, 
  Zap, 
  Code, 
  ArrowRight, 
  Play, 
  Check, 
  Layers,
  Sparkle
} from "lucide-react";

interface LandingPageProps {
  onStartEditing: () => void;
}

export default function LandingPage({ onStartEditing }: LandingPageProps) {
  const [isAnnual, setIsAnnual] = useState(true);
  const [sliderPos, setSliderPos] = useState(45);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Before/after drag logic
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0D0E12] text-[#E2E8F0] overflow-x-hidden select-none font-sans">
      
      {/* Soft restrained background details */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-cyan-500/[0.015] blur-[150px] pointer-events-none" />

      {/* Grid pattern with low contrast to reduce visual noise */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1e26_1px,transparent_1px)] opacity-[0.08] [background-size:32px_32px] pointer-events-none" />

      {/* Navbar */}
      <header className="relative z-50 flex items-center justify-between max-w-7xl mx-auto px-8 py-8 border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08]">
            <Sparkle className="w-4 h-4 text-slate-300" />
          </div>
          <span className="font-display font-medium text-lg tracking-tight text-white">
            PixelForge
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-10 text-xs tracking-wider uppercase font-semibold text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#before-after" className="hover:text-white transition-colors">Interactive Demo</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <span className="px-3 py-1 text-[10px] border border-white/[0.05] bg-white/[0.01] text-slate-400 rounded-full font-mono flex items-center gap-1.5 backdrop-blur-md">
            <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
            V1.2 Live
          </span>
        </nav>

        <button 
          id="btn-nav-cta"
          onClick={onStartEditing}
          className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all duration-300 cursor-pointer"
        >
          Platform Demo
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center pt-24 pb-16 px-8 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.015] border border-white/[0.04] backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3 h-3 text-slate-400" />
          <span className="text-[9px] font-mono tracking-widest uppercase font-medium text-slate-400">
            Studio-Grade Generative Image Intelligence
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl lg:text-[4.75rem] font-bold tracking-tight text-white mb-6 leading-[1.08]"
        >
          AI-powered image precision.<br />
          <span className="text-slate-500 font-normal">
            Refined. Balanced. Instant.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-sm sm:text-base text-slate-400 max-w-2xl mb-12 leading-relaxed font-light"
        >
          Remove backgrounds, upscale photos to crystal-clear high resolutions, generate creative artwork from prompts, and erase unwanted objects—all with single-click AI precision.
        </motion.p>

        {/* Hero CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-5 mb-24 z-20"
        >
          <button 
            id="hero-cta-editor"
            onClick={onStartEditing}
            className="flex items-center gap-2 px-8 py-3.5 rounded-lg bg-white text-black hover:bg-neutral-200 font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
          >
            Start Editing Free
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
          
          <a 
            href="#before-after"
            className="flex items-center gap-2 px-8 py-3.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] text-slate-300 border border-white/[0.05] text-xs font-semibold uppercase tracking-wider transition-all duration-300 backdrop-blur-md"
          >
            <Play className="w-3 h-3 text-slate-400 fill-slate-400" />
            Watch Slider Demo
          </a>
        </motion.div>

        {/* Hero Device Frame Mockup with translucent glass styling */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-full rounded-xl border border-white/[0.04] bg-white/[0.01] p-2 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-2 px-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/[0.06]" />
              <span className="w-2 h-2 rounded-full bg-white/[0.06]" />
              <span className="w-2 h-2 rounded-full bg-white/[0.06]" />
              <span className="ml-2 font-mono text-[9px] text-slate-500">workspace_canvas.xd</span>
            </div>
            <span className="px-3 py-0.5 bg-white/[0.03] rounded font-mono text-[9px] text-slate-400">
              Active Tool: Magic Background Removal
            </span>
          </div>

          {/* Simple Static Workspace Mockup Graphic */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-lg overflow-hidden bg-[#0A0B0F] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0F1014] [background-image:radial-gradient(#1e1e26_1px,transparent_1px)] opacity-[0.04] pointer-events-none" />
            <div className="relative flex flex-col items-center max-w-sm z-10">
              <div className="relative rounded-xl border border-white/[0.04] p-12 bg-white/[0.015] backdrop-blur-xl shadow-xl flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/[0.08]">
                  <Scissors className="w-4 h-4 text-slate-300" />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-100">AI Background Seeding</h3>
                  <p className="text-[11px] leading-relaxed text-slate-500">Perfect subject identification is automatically running on file load.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-8 py-32">
        <div className="text-center mb-20">
          <h2 className="font-display text-3xl sm:text-5xl font-semibold mb-4 tracking-tight text-white animate-fade-in">
            Infinite Editing. No Technical Friction.
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto font-light text-sm sm:text-base leading-relaxed">
            Professional AI transformations packaged into instant single-click operations. Built to streamline your creative process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Background Remover */}
          <div className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 backdrop-blur-xl hover:bg-white/[0.03] hover:border-white/[0.08] hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-white/[0.02] flex items-center justify-center border border-white/[0.05] mb-6 group-hover:bg-white/[0.06] transition-colors">
              <Scissors className="w-4 h-4 text-slate-300" />
            </div>
            <h3 className="font-display font-medium text-base text-white mb-2">Background Remover</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Remove backgrounds in one second. Perfect edge fidelity around hair, glass, clothing, and complex fibers.
            </p>
          </div>

          {/* Card 2: AI Upscale */}
          <div className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 backdrop-blur-xl hover:bg-white/[0.03] hover:border-white/[0.08] hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-white/[0.02] flex items-center justify-center border border-white/[0.05] mb-6 group-hover:bg-white/[0.06] transition-colors">
              <Maximize2 className="w-4 h-4 text-slate-300" />
            </div>
            <h3 className="font-display font-medium text-base text-white mb-2">AI Upscaler</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enlarge images up to 8K resolutions. Infuses real synthetic detail into blur, restoring textures, skin, and fine print.
            </p>
          </div>

          {/* Card 3: Magic Erase */}
          <div className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 backdrop-blur-xl hover:bg-white/[0.03] hover:border-white/[0.08] hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-white/[0.02] flex items-center justify-center border border-white/[0.05] mb-6 group-hover:bg-white/[0.06] transition-colors">
              <Sparkles className="w-4 h-4 text-slate-300" />
            </div>
            <h3 className="font-display font-medium text-base text-white mb-2">Magic Eraser</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Paint a mask over dynamic background defects, tourists, wires, or objects. Watch them vanish, blended seamlessly.
            </p>
          </div>

          {/* Card 4: AI Generator */}
          <div className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 backdrop-blur-xl hover:bg-white/[0.03] hover:border-white/[0.08] hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-white/[0.02] flex items-center justify-center border border-white/[0.05] mb-6 group-hover:bg-white/[0.06] transition-colors">
              <Palette className="w-4 h-4 text-slate-300" />
            </div>
            <h3 className="font-display font-medium text-base text-white mb-2">AI Generator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Describe your dream canvas in natural text. Generates photorealistic mockups, artwork, avatars, or logos instantly.
            </p>
          </div>

          {/* Card 5: Batch Edit */}
          <div className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 backdrop-blur-xl hover:bg-white/[0.03] hover:border-white/[0.08] hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-white/[0.02] flex items-center justify-center border border-white/[0.05] mb-6 group-hover:bg-white/[0.06] transition-colors">
              <Layers className="w-4 h-4 text-slate-300" />
            </div>
            <h3 className="font-display font-medium text-base text-white mb-2">Fast Stack Presets</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Save edit logs in state presets. Instantly carry over edits dynamically block-by-block on new uploads.
            </p>
          </div>

          {/* Card 6: Developer API */}
          <div className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 backdrop-blur-xl hover:bg-white/[0.03] hover:border-white/[0.08] hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-white/[0.02] flex items-center justify-center border border-white/[0.05] mb-6 group-hover:bg-white/[0.06] transition-colors">
              <Code className="w-4 h-4 text-slate-300" />
            </div>
            <h3 className="font-display font-medium text-base text-white mb-2">Premium API Endpoints</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Integrate PixelForge functions directly into your production servers using raw HTTP fetch routes.
            </p>
          </div>

        </div>
      </section>

      {/* Before/After Interactive Comparison Section */}
      <section id="before-after" className="relative z-10 bg-[#121318]/40 border-y border-white/[0.03] py-28 px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 space-y-8">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#06B6D4] font-semibold uppercase block">
              Interactive Slider Display
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
              Hair-Perfect Accuracy. Every Time.
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base font-light">
              See the direct before-and-after comparison of our premium background removal. Move the dragging handle back-and-forth dynamically to test how fine details are preserved seamlessly while isolating product subjects.
            </p>
            <div className="space-y-4 font-light text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-slate-400" />
                <span>Zero color-bleed or jagged boundaries</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-slate-400" />
                <span>Transparent standard alpha PNG export</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-slate-400" />
                <span>Supports complex silhouettes and edge fibers</span>
              </div>
            </div>
            <div className="pt-4">
              <button 
                id="btn-interactive-edit"
                onClick={onStartEditing}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                Upload Your Image
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>

          {/* Interactive Custom Canvas Slider container */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div 
              ref={sliderRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-square max-w-[480px] rounded-xl overflow-hidden border border-white/[0.04] select-none bg-[#0D0E12] shadow-xl"
            >
              {/* Background removed (After - transparent checkered grid patterns) */}
              <div className="absolute inset-0 bg-[#131419]/90 flex items-center justify-center p-3 opacity-95">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px]" />
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80" 
                  alt="Product Sneaker After Removal"
                  className="w-[85%] h-[85%] object-contain select-none filter drop-shadow-[0_15px_30px_rgba(255,255,255,0.02)] z-10"
                />
              </div>

              {/* Original image (Before - Red block backdrop - clipped) */}
              <div 
                className="absolute inset-0 bg-[#1e1f26] flex items-center justify-center p-3 z-20 pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80" 
                  alt="Original Product Sneaker"
                  className="w-[85%] h-[85%] object-contain select-none"
                />
              </div>

              {/* Slider boundary bar */}
              <div 
                className="absolute top-0 bottom-0 w-px bg-white/20 cursor-ew-resize z-30 flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
              >
                <div className="w-8 h-8 rounded-full bg-[#131419] border border-white/[0.08] shadow-xl flex items-center justify-center text-slate-300 select-none hover:text-white transition-colors">
                  <span className="text-xs font-semibold leading-none select-none">⇄</span>
                </div>
              </div>

              {/* Captions */}
              <span className="absolute bottom-4 left-4 z-40 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded font-mono text-[9px] tracking-wider uppercase border border-white/[0.04] text-slate-300">
                Original Photo
              </span>
              <span className="absolute bottom-4 right-4 z-40 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded font-mono text-[9px] tracking-wider uppercase border border-white/[0.04] text-slate-300">
                AI Transparent Isolated
              </span>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing" className="relative z-10 max-w-6xl mx-auto px-8 py-32">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-semibold mb-4 tracking-tight text-white">
            Simple Pricing. Scale as You Need.
          </h2>
          <p className="text-slate-500 max-w-md mx-auto font-light text-sm sm:text-base leading-relaxed">
            Get started 100% free. Upgrade for high-speed server execution, priority upscaling, and API pipeline integrations.
          </p>

          <div className="flex items-center justify-center gap-3.5 mt-8">
            <span className={`text-[11px] font-mono uppercase tracking-wider ${!isAnnual ? 'text-white' : 'text-slate-500'} font-medium`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-10 h-5.5 rounded-full bg-white/[0.04] border border-white/[0.08] transition-colors p-0.5 flex items-center cursor-pointer"
            >
              <div className={`w-4 h-4 rounded-full bg-slate-300 transition-transform ${isAnnual ? 'translate-x-[18px]' : 'translate-x-0'}`} />
            </button>
            <span className={`text-[11px] font-mono uppercase tracking-wider ${isAnnual ? 'text-white' : 'text-slate-500'} font-medium flex items-center gap-1.5`}>
              Annually (Save 20%)
              <span className="px-1.5 py-0.5 bg-white/[0.06] text-slate-300 text-[8px] rounded uppercase font-medium border border-white/[0.04]">
                20% off
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Free */}
          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 flex flex-col justify-between space-y-8 hover:bg-white/[0.015] hover:border-white/[0.08] transition-all duration-300">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Phase One</span>
              <h3 className="font-display font-medium text-xl text-white">Sandbox</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Perfect to test editing tools and play with simulated AI outputs limits.</p>
              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-3xl font-bold font-display">$0</span>
                <span className="text-slate-500 text-xs font-light">/ month</span>
              </div>
              <hr className="border-white/[0.04]" />
              <div className="space-y-3.5 text-xs text-slate-300 font-light">
                <div className="flex items-center gap-2">
                  <Check className="text-slate-400 w-3.5 h-3.5" />
                  <span>10 credits per month</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-slate-400 w-3.5 h-3.5" />
                  <span>Standard background removal only</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-slate-400 w-3.5 h-3.5" />
                  <span>Interactive local brush erasing</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="line-through">No API Access</span>
                </div>
              </div>
            </div>
            <button 
              id="pricing-cta-free"
              onClick={onStartEditing}
              className="w-full py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-slate-200 text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
            >
              Get Sandbox Access
            </button>
          </div>

          {/* Card 2: Pro */}
          <div className="relative rounded-xl border border-white/[0.08] bg-[#16171F] p-8 flex flex-col justify-between space-y-8 scale-100 md:scale-[1.02] z-20 shadow-xl">
            <div className="absolute top-0 right-6 -translate-y-1/2 px-2.5 py-0.5 bg-white text-black text-[8px] uppercase font-bold rounded tracking-widest">
              Most Selected
            </div>
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">Creator Elite</span>
              <h3 className="font-display font-medium text-xl text-white">Professional Pro</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Our advanced suite for creators, digital editors, and professional studios.</p>
              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-3xl font-bold font-display">${isAnnual ? "15" : "19"}</span>
                <span className="text-slate-500 text-xs font-light">/ month</span>
              </div>
              <hr className="border-white/[0.06]" />
              <div className="space-y-3.5 text-xs text-slate-200 font-light">
                <div className="flex items-center gap-2">
                  <Check className="text-slate-300 w-3.5 h-3.5" />
                  <span className="font-semibold text-white">500 high-speed credits / mo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-slate-300 w-3.5 h-3.5" />
                  <span>Unlimited background removals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-slate-300 w-3.5 h-3.5" />
                  <span>AI upscaler up to 8K resolutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-slate-300 w-3.5 h-3.5" />
                  <span>Flux & Gemini Generative access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-slate-300 w-3.5 h-3.5" />
                  <span>Full server endpoints API access</span>
                </div>
              </div>
            </div>
            <button 
              id="pricing-cta-pro"
              onClick={onStartEditing}
              className="w-full py-3 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>

          {/* Card 3: Business */}
          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 flex flex-col justify-between space-y-8 hover:bg-white/[0.015] hover:border-white/[0.08] transition-all duration-300">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Volume Scale</span>
              <h3 className="font-display font-medium text-xl text-white">Enterprise</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Engineered for robust batch operations, unlimited speed, and priority routing queues.</p>
              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-3xl font-bold font-display">${isAnnual ? "63" : "79"}</span>
                <span className="text-slate-500 text-xs font-light">/ month</span>
              </div>
              <hr className="border-white/[0.04]" />
              <div className="space-y-3.5 text-xs text-slate-300 font-light">
                <div className="flex items-center gap-2">
                  <Check className="text-slate-400 w-3.5 h-3.5" />
                  <span>5,000 priority queue credits / mo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-slate-400 w-3.5 h-3.5" />
                  <span>Unlimited concurrent pipeline executions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-slate-400 w-3.5 h-3.5" />
                  <span>Dedicated custom integration support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-slate-400 w-3.5 h-3.5" />
                  <span>SLA backed uptime guarantee</span>
                </div>
              </div>
            </div>
            <button 
              id="pricing-cta-enterprise"
              onClick={onStartEditing}
              className="w-full py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-slate-200 text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
            >
              Contact Enterprise
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.03] bg-[#0A0B0F]/80 py-16 px-8 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="w-5.5 h-5.5 rounded bg-white/[0.08] flex items-center justify-center text-white text-[9.5px] font-bold">
                PF
              </span>
              <span className="font-display font-semibold tracking-tight text-white text-base">PixelForge</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm font-light">
              Premium design operations suite and background isolation engine.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-10 text-xs text-slate-400 font-light">
            <div className="space-y-2">
              <span className="font-medium text-white text-[11px] block font-semibold">Developers</span>
              <span className="hover:text-white block cursor-not-allowed transition-colors">API Reference</span>
              <span className="hover:text-white block cursor-not-allowed transition-colors">System Health</span>
            </div>
            <div className="space-y-2">
              <span className="font-medium text-white text-[11px] block font-semibold">Company</span>
              <span className="hover:text-white block cursor-not-allowed transition-colors">Twitter</span>
              <span className="hover:text-white block cursor-not-allowed transition-colors">GitHub</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/[0.03] mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] gap-4 text-center font-light">
          <span>&copy; {new Date().getFullYear()} PixelForge AI, Inc. All rights reserved.</span>
          <div className="font-mono text-[9px] text-slate-600">
            Powered by high-precision segmentation pipelines
          </div>
        </div>
      </footer>

    </div>
  );
}
