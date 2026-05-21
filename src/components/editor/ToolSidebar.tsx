import React from "react";
import { type ActiveTool } from "../../types";
import { 
  Scissors, 
  Maximize2, 
  Sparkles, 
  Palette, 
  History, 
  ChevronLeft,
  Sparkle
} from "lucide-react";

interface ToolSidebarProps {
  activeTool: ActiveTool;
  setActiveTool: (tool: ActiveTool) => void;
  onBackToLanding: () => void;
}

interface ToolItem {
  id: ActiveTool;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
}

export default function ToolSidebar({ activeTool, setActiveTool, onBackToLanding }: ToolSidebarProps) {
  const tools: ToolItem[] = [
    {
      id: "remove-bg",
      label: "Remove BG",
      description: "Extract objects & erase backdrops",
      icon: Scissors,
    },
    {
      id: "upscale",
      label: "AI Upscaler",
      description: "Enlarge photos up to 8K resolutions",
      icon: Maximize2,
    },
    {
      id: "magic-erase",
      label: "Magic Erase",
      description: "Paint brush to vanish defects",
      icon: Sparkles,
    },
    {
      id: "generate",
      label: "AI Generator",
      description: "Render images from natural text",
      icon: Palette,
    },
    {
      id: "history",
      label: "Edit History",
      description: "Backstep and audit canvas history",
      icon: History,
    },
  ];

  return (
    <div className="w-[80px] sm:w-[90px] h-full bg-[#111118] border-r border-white/10 flex flex-col items-center justify-between py-6 relative z-30 shrink-0 select-none">
      
      {/* Upper Logo / Exit trigger */}
      <div className="flex flex-col items-center gap-6 w-full">
        <button 
          id="sidebar-btn-back"
          onClick={onBackToLanding}
          className="group w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center transition-all cursor-pointer"
          aria-label="Back to landing"
          title="Back to Home"
        >
          <ChevronLeft className="w-4 h-4 text-[#64748B] group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
        </button>

        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] shadow-[0_0_15px_rgba(124,58,237,0.4)] mb-4 cursor-default">
          <Sparkle className="w-5 h-5 text-white animate-pulse" />
        </div>

        <div className="w-8 h-px bg-white/10" />
      </div>

      {/* Center Tool Navigation List */}
      <nav className="flex flex-col gap-4 w-full px-2" aria-label="Editor Sidebar Toolbar">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;

          return (
            <button
              id={`tool-btn-${tool.id}`}
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`group relative w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 cursor-pointer ${
                isActive 
                  ? "bg-[#7C3AED]/25 border border-[#7C3AED]/30 ring-1 ring-[#7C3AED]/50 text-[#A855F7] shadow-[0_0_15px_rgba(124,58,237,0.2)]" 
                  : "text-[#64748B] hover:text-white hover:bg-white/5"
              }`}
              title={tool.description}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-[#A855F7]" : "text-white/60"}`} />
              <span className={`text-[9px] font-bold uppercase tracking-wider text-center truncate w-full px-1 ${isActive ? "text-[#A855F7]" : "text-[#64748B]"}`}>{tool.label}</span>

              {/* Styled tooltips for wide screen helpful navigation */}
              <div className="absolute left-[110%] hidden group-hover:flex flex-col bg-slate-950 border border-white/10 text-xs text-white rounded-lg px-3 py-2 w-48 shadow-2xl pointer-events-none z-50 animate-fade-in">
                <span className="font-bold text-[11px] text-[#A855F7]">{tool.label}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{tool.description}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer system status light */}
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] tracking-widest text-[#64748B]">FORGE</span>
        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" title="All Core Systems Active" />
      </div>

    </div>
  );
}
