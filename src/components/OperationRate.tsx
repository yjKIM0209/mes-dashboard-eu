"use client";

import { mockEquipments } from "@/lib/mockData";

export default function OperationRate() {
  const total = mockEquipments.length;
  const running = mockEquipments.filter((e) => e.status === "Running").length;
  const rate = Math.round((running / total) * 100);

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-[300px]">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Operation Rate
        </span>
        <span className="text-sm font-black text-blue-600 font-mono">
          {rate}%
        </span>
      </div>
      
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(59,130,246,0.4)]"
          style={{ width: `${rate}%` }}
        />
      </div>
      
      <p className="text-[9px] text-right text-slate-400 font-medium tracking-tighter">
        ACTIVE: <span className="text-slate-600">{running}</span> / {total} UNITS
      </p>
    </div>
  );
}