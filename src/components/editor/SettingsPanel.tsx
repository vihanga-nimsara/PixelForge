import React, { useState } from "react";
import { type ActiveTool, type ImageStyle, type ApiKeysConfig } from "../../types";
import { 
  Zap, 
  Trash2, 
  Sparkles, 
  Maximize2, 
  Scissors, 
  Palette, 
  Download, 
  Info,
  ShieldCheck,
  Cpu
} from "lucide-react";

interface SettingsPanelProps {
  activeTool: ActiveTool;
  isProcessing: boolean;
  onProcess: (params: any) => void;
  onDownload: () => void;
  hasResult: boolean;
  apiConfig: ApiKeysConfig;
}

export default function SettingsPanel({
  activeTool,
  isProcessing,
  onProcess,
  onDownload,
  hasResult,
  apiConfig,
}: SettingsPanelProps) {
  // Upscale Config
  const [scaleFactor, setScaleFactor] = useState<number>(2);
  const [creativity, setCreativity] = useState<number>(35);

  // Generate Config
  const [promptInput, setPromptInput] = useState<string>("");
  const [artStyle, setArtStyle] = useState<ImageStyle>("realistic");
  const [aspectSelect, setAspectSelect] = useState<string>("1:1");

  // Remove BG Config
  const [bgType, setBgType] = useState<"transparent" | "white" | "custom">("transparent");
  const [bgColor, setBgColor] = useState<string>("#7C3AED");

  // Style Preset Definitions
  const stylePresets: { id: ImageStyle; label: string; icon: string }[] = [
    { id: "realistic", label: "Photorealistic", icon: "📸" },
    { id: "anime", label: "Aesthetic Anime", icon: "🌸" },
    { id: "oil-painting", label: "Oil Painting", icon: "🎨" },
    { id: "vaporwave", label: "Vaporwave Retro", icon: "🌌" },
    { id: "3d-render", label: "3D Render Model", icon: "📦" },
  ];

  // Aspect ratio structures
  const aspectRatios = [
    { label: "1:1 Square", value: "1:1", width: 1024, height: 1024 },
    { label: "16:9 Cinema", value: "16:9", width: 1024, height: 576 },
    { label: "9:16 Portrait", value: "9:16", width: 576, height: 1024 },
  ];

  // Dispatches current action parameters based on what tool is active
  const handleProcessAction = () => {
    if (activeTool === "remove-bg") {
      onProcess({
        tool: "remove-bg",
        bgType,
        bgColor,
      });
    } else if (activeTool === "upscale") {
      onProcess({
        tool: "upscale",
        scale: scaleFactor,
        creativity,
      });
    } else if (activeTool === "magic-erase") {
      onProcess({
        tool: "magic-erase",
        prompt: "clear, high quality blend background, flawless surface texture",
      });
    } else if (activeTool === "generate") {
      if (!promptInput.trim()) {
        alert("Please enter a text prompt to generate image assets.");
        return;
      }
      onProcess({
        tool: "generate",
        prompt: `${promptInput}, in ${artStyle} art style, masterpiece, highly detailed representation`,
        aspectRatio: aspectSelect,
      });
    }
  };

  return (
    <div className="w-full lg:w-72 h-full bg-[#111118] border-l border-white/10 flex flex-col justify-between shrink-0 relative z-30 select-none font-sans">
      
      {/* 1. Header/Toolbar configuration contexts */}
      <div className="overflow-y-auto flex-1 p-5 space-y-6">
        
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#64748B] uppercase block">Control Center</span>
          <h2 className="font-display font-bold text-base text-white mt-1 flex items-center gap-2">
            {activeTool === "remove-bg" && (
              <>
                <Scissors className="w-4 h-4 text-[#A855F7]" />
                <span>Background Keyer</span>
              </>
            )}
            {activeTool === "upscale" && (
              <>
                <Maximize2 className="w-4 h-4 text-[#A855F7]" />
                <span>AI Enhancer</span>
              </>
            )}
            {activeTool === "magic-erase" && (
              <>
                <Sparkles className="w-4 h-4 text-[#A855F7]" />
                <span>Object Eraser</span>
              </>
            )}
            {activeTool === "generate" && (
              <>
                <Palette className="w-4 h-4 text-[#A855F7]" />
                <span>Asset Creator</span>
              </>
            )}
            {activeTool === "history" && (
              <>
                <span>Action History stack</span>
              </>
            )}
          </h2>
        </div>

        <hr className="border-white/10" />

        {/* 2. Contextual Panels based on active tool */}

        {/* TOOL PANEL 1: Background removal */}
        {activeTool === "remove-bg" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest block">Isolate Format Output</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="btn-bg-transparent"
                  onClick={() => setBgType("transparent")}
                  className={`py-3 rounded-lg border flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                    bgType === "transparent"
                      ? "bg-[#7C3AED]/20 border-[#7C3AED]/30 text-white font-bold ring-1 ring-[#7C3AED]/40"
                      : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                  }`}
                >
                  <span className="text-xs font-bold">PNG</span>
                  <span className="text-[9px] tracking-wider uppercase opacity-75">Transparent</span>
                </button>
                <button
                  id="btn-bg-white"
                  onClick={() => setBgType("white")}
                  className={`py-3 rounded-lg border flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                    bgType === "white"
                      ? "bg-[#7C3AED]/20 border-[#7C3AED]/30 text-white font-bold ring-1 ring-[#7C3AED]/40"
                      : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                  }`}
                >
                  <span className="text-xs font-bold">JPEG</span>
                  <span className="text-[9px] tracking-wider uppercase opacity-75">White Backdrop</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <button
                id="btn-bg-custom"
                onClick={() => setBgType("custom")}
                className={`w-full px-3 py-2.5 rounded-lg border text-xs text-left font-medium transition-all flex items-center justify-between cursor-pointer ${
                  bgType === "custom"
                    ? "bg-[#7C3AED]/20 border-[#7C3AED]/30 text-white font-bold ring-1 ring-[#7C3AED]/40"
                    : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                }`}
              >
                <span>Solid Custom Color</span>
                <span className="w-3.5 h-3.5 rounded-md border border-white/10" style={{ backgroundColor: bgColor }} />
              </button>

              {bgType === "custom" && (
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-lg animate-fade-in">
                  <input
                    id="input-bg-color-picker"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-8 rounded border border-white/10 bg-transparent cursor-pointer shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">Hex Color Code</span>
                    <input
                      id="input-bg-color-hex"
                      type="text"
                      value={bgColor.toUpperCase()}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="bg-transparent border-0 text-xs font-mono text-white focus:ring-0 p-0 w-full uppercase"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TOOL PANEL 2: Upscaling photo scale */}
        {activeTool === "upscale" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest block">Super Resolution Scale</label>
              <div className="grid grid-cols-3 gap-2">
                {[2, 4, 8].map((factor) => (
                  <button
                    id={`btn-scale-${factor}x`}
                    key={factor}
                    onClick={() => setScaleFactor(factor)}
                    className={`px-3 py-2.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                      scaleFactor === factor
                        ? "bg-[#7C3AED]/20 border-[#7C3AED]/30 text-white font-bold ring-1 ring-[#7C3AED]/40"
                        : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {factor}x UHD
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#64748B] uppercase tracking-wider text-[11px] font-bold">Texture Creativity</span>
                <span className="font-mono text-[#A855F7] font-bold">{creativity}%</span>
              </div>
              <input
                id="input-upscale-creativity"
                type="range"
                min="0"
                max="100"
                value={creativity}
                onChange={(e) => setCreativity(Number(e.target.value))}
                className="w-full h-1 rounded-full bg-white/10 accent-[#7C3AED] cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 leading-normal block">
                Higher counts add delicate neural texture strokes to skin, graphics, and hair.
              </span>
            </div>
          </div>
        )}

        {/* TOOL PANEL 3: Inpainting / Object Removal */}
        {activeTool === "magic-erase" && (
          <div className="space-y-4">
            <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/25 p-4 rounded-xl space-y-2.5">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#A855F7] shrink-0" />
                <span className="text-xs font-bold text-[#A855F7] tracking-wide uppercase">Inpainter Guide</span>
              </div>
              <p className="text-[11px] text-slate-350 leading-relaxed">
                1. Click and brush on the photo to paint glowing masks over unwanted elements.<br />
                2. Click the <span className="text-white font-semibold">"Surgical Erase"</span> button below.<br />
                3. High-performance content-aware healing fills back the background instantly.
              </p>
            </div>
          </div>
        )}

        {/* TOOL PANEL 4: Generative text prompt inputs */}
        {activeTool === "generate" && (
          <div className="space-y-6">
            <div className="space-y-2.5">
              <label id="lbl-gen-prompt" className="text-xs font-bold text-[#64748B] uppercase tracking-widest block">Creative Text Prompt</label>
              <textarea
                id="input-gen-prompt"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Describe what you want to render in rich vivid detail (e.g. 'Highly styled vector design of futuristic robot skateboarder on black canvas with a purple neon glow'...)"
                className="w-full text-xs text-white placeholder-slate-600 bg-[#07070B] border border-white/10 rounded-xl p-3.5 h-28 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest block">Artistic Presets</label>
              <div className="grid grid-cols-1 gap-1.5">
                {stylePresets.map((preset) => (
                  <button
                    id={`btn-preset-${preset.id}`}
                    key={preset.id}
                    onClick={() => setArtStyle(preset.id)}
                    className={`w-full px-3 py-2 rounded-lg border text-xs text-left font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      artStyle === preset.id
                        ? "bg-[#7C3AED]/20 border-[#7C3AED]/30 text-white font-bold"
                        : "bg-white/[0.01] border-white/5 text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{preset.label}</span>
                    <span className="text-sm">{preset.icon}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest block">Aspect Ratio</label>
              <div className="grid grid-cols-1 gap-1.5">
                {aspectRatios.map((aspect) => (
                  <button
                    id={`btn-aspect-${aspect.value}`}
                    key={aspect.value}
                    onClick={() => setAspectSelect(aspect.value)}
                    className={`px-3 py-2 rounded-lg border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${
                      aspectSelect === aspect.value
                        ? "bg-[#7C3AED]/20 border-[#7C3AED]/30 text-white font-bold"
                        : "bg-white/[0.01] border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>{aspect.label}</span>
                    <span className="font-mono text-[9px] text-slate-500">{aspect.value}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PANEL IF ON HISTORY TABS */}
        {activeTool === "history" && (
          <div className="space-y-3">
            <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xl text-center space-y-1">
              <span className="text-xs text-slate-300 block font-medium">History Statestack Selected</span>
              <span className="text-[11px] text-slate-500 block leading-normal">
                Expand the left rail list and inspect individual timestamps on thumbnail cards to restore edit logs.
              </span>
            </div>
          </div>
        )}

        {/* AI AUTO ENHANCE BOX (Sleek Theme integration) */}
        <div className="pt-2">
          <div className="p-4 rounded-xl bg-[#06B6D4]/5 border border-[#06B6D4]/20 flex gap-3 shadow-md">
            <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4] shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-bold text-white uppercase tracking-wider">AI Auto-Enhance</div>
              <div className="text-[10px] text-[#06B6D4]/80 mt-1 font-mono">POWERED BY GEMINI PRO</div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Core dynamic execution triggers and Download handlers */}
      <div className="p-5 border-t border-white/10 bg-[#0D0D14] space-y-3">
        
        {activeTool !== "history" && (
          <button
            id="panel-btn-process-action"
            onClick={handleProcessAction}
            disabled={isProcessing}
            className={`w-full py-3.5 rounded-xl font-display font-extrabold text-sm uppercase tracking-wider relative overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 text-white border border-[#7C3AED]/20 shadow-lg shadow-violet-500/10 cursor-pointer ${
              isProcessing 
                ? "bg-slate-800 border-white/5 cursor-not-allowed text-slate-500 animate-pulse" 
                : "bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:opacity-90 shadow-lg shadow-violet-500/25 active:scale-95"
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-dashed border-white rounded-full animate-spin" />
                <span>AI Processing...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-cyan-300 animate-bounce" />
                <span>
                  {activeTool === "remove-bg" && "Run Background Isolation"}
                  {activeTool === "upscale" && "Enlarge Super Resolution"}
                  {activeTool === "magic-erase" && "Apply Object Erase"}
                  {activeTool === "generate" && "Render Image Draft"}
                </span>
              </>
            )}
          </button>
        )}

        {/* Download action handles */}
        {hasResult && !isProcessing && (
          <button
            id="panel-btn-download"
            onClick={onDownload}
            className="w-full py-3 bg-white hover:bg-white/95 text-black font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.98] transition-transform cursor-pointer"
          >
            <Download className="w-4 h-4 text-black" />
            <span>Download PNG Asset</span>
          </button>
        )}
      </div>

    </div>
  );
}
