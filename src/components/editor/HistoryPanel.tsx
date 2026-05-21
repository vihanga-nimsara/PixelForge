import React from "react";
import { type HistoryItem } from "../../types";
import { History, CalendarRange, Clock, Sparkles } from "lucide-react";

interface HistoryPanelProps {
  history: HistoryItem[];
  currentId: string;
  onRestoreState: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export default function HistoryPanel({
  history,
  currentId,
  onRestoreState,
  onClearHistory,
}: HistoryPanelProps) {
  return (
    <div className="flex-1 h-full flex flex-col justify-between overflow-hidden bg-[#111118] p-5 select-none animate-fade-in text-slate-100 font-sans">
      
      {/* Upper header controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-[#06B6D4] uppercase block font-bold">Stack Auditor</span>
            <h3 className="font-display font-medium text-base text-white flex items-center gap-2">
              <History className="w-4 h-4 text-[#A855F7]" />
              <span>Canvas Step Logs</span>
            </h3>
          </div>
          {history.length > 1 && (
            <button
              id="history-btn-clear-all"
              onClick={onClearHistory}
              className="text-[10px] text-red-400 hover:text-red-300 transition-colors uppercase font-mono font-bold hover:underline cursor-pointer"
            >
              Flush History
            </button>
          )}
        </div>
        <p className="text-xs text-[#64748B] leading-normal">
          Chronological listing of visual actions applied. Click any thumbnail state card below to restore that exact image version.
        </p>
      </div>

      <hr className="border-white/10 my-4" />

      {/* Middle history scroll area */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1.5">
        {history.length === 0 ? (
          <div className="h-44 rounded-xl border border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center justify-center p-6 text-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 border border-white/15 flex items-center justify-center">
              <History className="w-4.5 h-4.5 text-slate-500" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-300 block">No Edit Logs Yet</span>
              <span className="text-[10px] text-slate-500 block leading-normal">
                Upload a photo or submit an AI generation in sidebar tools to begin compiling histories.
              </span>
            </div>
          </div>
        ) : (
          [...history].reverse().map((item) => {
            const isCurrent = currentId === item.id;

            return (
              <button
                id={`history-item-btn-${item.id}`}
                key={item.id}
                onClick={() => onRestoreState(item)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-3.5 group cursor-pointer ${
                  isCurrent
                    ? "bg-[#7C3AED]/20 border-[#7C3AED]/35 text-white ring-1 ring-[#7C3AED]/30"
                    : "bg-white/[0.01] border-white/10 text-slate-400 hover:bg-white/[0.03] hover:border-white/20"
                }`}
              >
                {/* Visual Thumbnail Frame */}
                <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-white/10 bg-[#07070B] shrink-0">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4px_4px]" />
                  <img
                    src={item.imageUrl}
                    alt={item.action}
                    className="w-full h-full object-cover relative z-10 transition-transform group-hover:scale-105"
                  />
                  {isCurrent && (
                    <div className="absolute inset-0 bg-violet-600/25 border-2 border-violet-500 rounded-lg z-25" />
                  )}
                </div>

                {/* Info and timestamp block */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-[11px] font-bold truncate block ${isCurrent ? "text-violet-300" : "text-slate-200"}`}>
                      {item.action}
                    </span>
                    {isCurrent && (
                      <span className="px-1.5 py-0.5 rounded bg-[#7C3AED] text-white font-mono font-bold text-[8px] uppercase tracking-wider scale-90 shrink-0">
                        Active State
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#64748B]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-[#64748B]" />
                      <span>{item.timestamp}</span>
                    </div>
                    {item.metadata && (
                      <span className="truncate max-w-[80px] text-right block text-[#64748B]">
                        {item.metadata}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Persistent safety backing guide */}
      <div className="pt-4 border-t border-white/10 mt-4">
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#64748B] bg-white/[0.01] p-3 rounded-lg border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
          <span>Restoring states will preserve all downstream channels. Click any item step to backtrack.</span>
        </div>
      </div>

    </div>
  );
}
