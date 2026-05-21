import React, { useState, useRef, useEffect } from "react";
import { Upload, Sparkles, AlertTriangle, Eye, EyeOff, RotateCcw, Paintbrush, Eraser } from "lucide-react";

interface ImageCanvasProps {
  currentImage: string | null;
  originalImage: string | null;
  setCurrentImage: (url: string | null) => void;
  setOriginalImage: (url: string | null) => void;
  isProcessing: boolean;
  activeTool: string;
  onUpload: (dataUrl: string) => void;
  maskCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  isEraserBrushDown: boolean;
  setIsEraserBrushDown: (down: boolean) => void;
}

export default function ImageCanvas({
  currentImage,
  originalImage,
  setCurrentImage,
  setOriginalImage,
  isProcessing,
  activeTool,
  onUpload,
  maskCanvasRef,
}: ImageCanvasProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showBefore, setShowBefore] = useState(false);
  const [brushSize, setBrushSize] = useState(25);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasMaskDrawings, setHasMaskDrawings] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // File drop handling
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === "string") {
        onUpload(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  // Synchronize mask canvas size with displayed image size
  const resizeMaskCanvas = () => {
    const canvas = maskCanvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    canvas.width = img.clientWidth || img.width || 600;
    canvas.height = img.clientHeight || img.height || 400;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(168, 85, 247, 0.55)"; // glowing violet/purple overlay
      ctx.lineWidth = brushSize;
      contextRef.current = ctx;
    }
  };

  useEffect(() => {
    if (activeTool === "magic-erase" && currentImage) {
      resizeMaskCanvas();
    }
  }, [activeTool, currentImage]);

  // Adjust line width dynamically on brush size slider change
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.lineWidth = brushSize;
    }
  }, [brushSize]);

  // Canvas drawing handles (for Magic Erase Masking)
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
    const canvas = maskCanvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Map bounding rect to actual canvas internal coordinates correctly
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    if (!coords || !contextRef.current) return;

    contextRef.current.beginPath();
    contextRef.current.moveTo(coords.x, coords.y);
    setIsDrawing(true);
    setHasMaskDrawings(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    e.preventDefault();
    const coords = getCoordinates(e);
    if (!coords) return;

    contextRef.current.lineTo(coords.x, coords.y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const clearMaskCanvas = () => {
    const canvas = maskCanvasRef.current;
    if (!canvas || !contextRef.current) return;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    setHasMaskDrawings(false);
  };

  const triggerLoaderMessages = [
    "PixelForge is analyzing fine fibers...",
    "Isolating background layers...",
    "Injecting synthetic neural textures...",
    "Perfecting hair contrast borders...",
    "Removing dynamic backdrops..."
  ];

  const [loadingMsg, setLoadingMsg] = useState(triggerLoaderMessages[0]);

  useEffect(() => {
    let interval: any;
    if (isProcessing) {
      let idx = 0;
      interval = setInterval(() => {
        idx = (idx + 1) % triggerLoaderMessages.length;
        setLoadingMsg(triggerLoaderMessages[idx]);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  return (
    <div className="flex-1 h-full bg-[#08080C] flex flex-col relative overflow-hidden select-none">
      
      {/* Upper info ribbon bar */}
      <div className="h-14 border-b border-white/10 px-6 flex items-center justify-between z-10 bg-[#0A0A0F]/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] sm:text-xs font-mono text-slate-400">SESSION TARGET:</span>
          {currentImage ? (
            <span className="px-2.5 py-0.5 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30 font-mono text-[10px] sm:text-xs text-[#A855F7]">
              Active Upload loaded
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] sm:text-xs text-[#64748B]">
              No photo uploaded
            </span>
          )}
        </div>

        {currentImage && (
          <div className="flex items-center gap-2">
            <button
              id="canvas-btn-reset"
              onClick={() => {
                if (confirm("Reset layout to original upload?")) {
                  setCurrentImage(originalImage);
                  clearMaskCanvas();
                }
              }}
              className="px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold bg-white/5 hover:bg-white/10 text-[#64748B] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Image
            </button>
          </div>
        )}
      </div>

      {/* Primary drag, drawing and processing visual zone */}
      <main className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#1e1e26_1px,transparent_1px)] opacity-20 [background-size:20px_20px] pointer-events-none" />

        {/* 1. Empty State File Drop Zone */}
        {!currentImage ? (
          <label 
            id="canvas-dropzone-label"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full max-w-lg aspect-[4/3] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragOver 
                ? "border-[#7C3AED] bg-[#7C3AED]/5 scale-[1.01]" 
                : "border-white/10 hover:border-white/20 bg-[#111118]/40 hover:bg-[#111118]/60"
            }`}
          >
            <input 
              id="canvas-file-input"
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileInputChange} 
            />
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] shadow-[0_0_15px_rgba(124,58,237,0.4)] flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-1">Drag and drop your photo</h3>
            <p className="text-xs text-[#64748B] mb-4">Supports high-res PNG, JPG, and WEBP files</p>
            <span className="px-5 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white text-xs font-semibold rounded-lg shadow-lg shadow-violet-500/20 hover:opacity-90 transition-all uppercase tracking-wider">
              Choose File
            </span>
          </label>
        ) : (
          /* 2. Uploaded active canvas screen logic */
          <div 
            ref={containerRef}
            className="relative max-w-full max-h-[70vh] flex items-center justify-center rounded-2xl overflow-hidden border border-white/10 bg-[#111118] shadow-2xl p-2"
          >
            {/* Checkerboard backdrop layout representation */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:10px_10px]" />

            {/* Subtle state HUD indicators */}
            <div className="absolute top-4 left-4 z-40 px-2.5 py-1 bg-black/60 backdrop-blur rounded text-[9px] font-bold text-white/80 tracking-widest uppercase border border-white/10">
              {showBefore ? "Original State view" : "Processed State view"}
            </div>

            {/* Display original image for direct before/after toggle */}
            <img
              ref={imageRef}
              src={showBefore ? (originalImage || currentImage) : currentImage}
              alt="Workspace display element"
              onLoad={resizeMaskCanvas}
              className={`max-w-full max-h-[65vh] object-contain select-none rounded-xl transition-all duration-300 ${
                isProcessing ? "opacity-30 blur-[2px]" : "opacity-100 blur-0"
              }`}
            />

            {/* Brushing Canvas Overlay for Magic Erase */}
            {activeTool === "magic-erase" && !isProcessing && (
              <div id="eraser-canvas-scaler" className="absolute inset-0 z-20 flex items-center justify-center cursor-crosshair">
                <canvas
                  id="mask-canvas"
                  ref={maskCanvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="max-w-full max-h-[65vh] object-contain opacity-70"
                />
              </div>
            )}

            {/* AI processing Spinner Panel Overlayer */}
            {isProcessing && (
              <div id="processing-spinner-overlay" className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-4 animate-fade-in">
                <div className="relative w-14 h-14">
                  <div className="absolute inset-0 border-2 border-dashed border-[#7C3AED]/20 rounded-full animate-spin-slow" />
                  <div className="absolute inset-0.5 border-t-2 border-b-2 border-[#A855F7] rounded-full animate-spin-fast" />
                </div>
                <div className="text-center space-y-1">
                  <span className="text-xs font-semibold text-slate-100 block">AI is working its magic...</span>
                  <span className="text-[10px] font-mono text-slate-400 block tracking-wide animate-pulse">{loadingMsg}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Workspace Controls & Brush sliders (active on model load) */}
      {currentImage && (
        <div id="canvas-bottom-controlbar" className="h-16 border-t border-white/10 bg-[#0A0A0F]/80 backdrop-blur-xl px-6 flex items-center justify-between shrink-0 relative z-20">
          
          {/* Left panel: Eraser brush parameters */}
          {activeTool === "magic-erase" ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Paintbrush className="w-3.5 h-3.5 text-[#A855F7]" />
                <span className="font-medium">Brush Size:</span>
              </div>
              <input 
                id="magic-brush-size-input"
                type="range" 
                min="5" 
                max="80" 
                value={brushSize} 
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-24 sm:w-36 h-1 rounded-full bg-white/10 accent-[#7C3AED] cursor-pointer"
              />
              <span className="font-mono text-[10px] text-slate-400">{brushSize}px</span>
              
              {hasMaskDrawings && (
                <button
                  id="brush-btn-clear"
                  onClick={clearMaskCanvas}
                  className="px-2 py-1 rounded bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 border border-[#7C3AED]/35 text-[10px] font-bold text-[#A855F7] transition-all cursor-pointer"
                >
                  Clear Brush
                </button>
              )}
            </div>
          ) : (
            <div className="text-xs text-[#64748B] font-medium flex items-center gap-1.5 select-none">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Workspace Layer Loaded. Select actions in control center.</span>
            </div>
          )}

          {/* Right panel: Before/after state comparison tool */}
          <button
            id="control-btn-toggle-comparison"
            onMouseDown={() => setShowBefore(true)}
            onMouseUp={() => setShowBefore(false)}
            onMouseLeave={() => setShowBefore(false)}
            onTouchStart={() => setShowBefore(true)}
            onTouchEnd={() => setShowBefore(false)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 border transition-all duration-200 cursor-pointer ${
              showBefore 
                ? "bg-[#7C3AED] border-[#7C3AED] text-white shadow-lg shadow-violet-500/25" 
                : "bg-white/[0.02] hover:bg-white/[0.06] border-white/10 text-slate-300"
            }`}
            title="Press and hold to review original image contrast"
          >
            {showBefore ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Hold to Compare Before</span>
            <span className="inline sm:hidden">Before</span>
          </button>
        </div>
      )}

    </div>
  );
}
