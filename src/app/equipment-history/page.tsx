"use client";

import { useState } from "react";
import HistoryGrid from "@/components/HistoryGrid";
import EquipmentTree from "@/components/EquipmentTree";

type PeriodType = "today" | "week" | "month" | "custom";

export default function HistoryPage() {
  const [selectedEqpIds, setSelectedEqpIds] = useState<string[]>([]);
  const [displayEqpIds, setDisplayEqpIds] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const [periodType, setPeriodType] = useState<PeriodType>("custom");
  const [startDate, setStartDate] = useState("2026-02-01T00:00");
  const [endDate, setEndDate] = useState("2026-02-20T23:59");

  const formatDate = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - offset)
      .toISOString()
      .slice(0, 16);
    return localISOTime;
  };

  const handlePeriodChange = (type: PeriodType) => {
    setPeriodType(type);
    if (type === "custom") return;

    const now = new Date();
    let start = new Date();
    let end = new Date();

    if (type === "today") {
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    } else if (type === "week") {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      start = new Date(now.setDate(diff));
      start.setHours(0, 0, 0, 0);
      end = new Date();
    } else if (type === "month") {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      start.setHours(0, 0, 0, 0);
      end = new Date();
    }

    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
  };

  const handleSearch = () => {
    setDisplayEqpIds(selectedEqpIds);
  };

  return (
    <div className="flex h-full flex-col p-4 bg-white gap-4 overflow-hidden text-slate-900">
      {/* 상단 헤더 섹션 */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            설비 상태 이력 조회
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="그리드 내 결과 검색"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-72 pl-4 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          
          <button className="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors shadow-sm flex items-center justify-center border border-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* 왼쪽 사이드바: 검색 조건 */}
        <section className="w-80 border border-slate-200 bg-slate-50 flex flex-col p-4 rounded-lg shadow-sm gap-4">
          <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">
            검색 조건
          </h2>

          <div className="flex-1 overflow-auto bg-white border border-slate-200 rounded p-2">
            <EquipmentTree onSelectionChange={setSelectedEqpIds} />
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
            <label className="text-xs font-semibold text-slate-500">
              기간 유형
            </label>
            <select
              value={periodType}
              onChange={(e) => handlePeriodChange(e.target.value as PeriodType)}
              className="border border-slate-300 rounded px-2 py-1.5 text-sm bg-white outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="today">금일</option>
              <option value="week">금주</option>
              <option value="month">금월</option>
              <option value="custom">사용자 정의</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500">
              조회 기간
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setPeriodType("custom");
              }}
              className="border border-slate-300 rounded px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setPeriodType("custom");
              }}
              className="border border-slate-300 rounded px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-[#10b981] text-white py-2.5 rounded-md font-bold hover:bg-[#059669] transition-all shadow-md active:scale-[0.98]"
          >
            조회
          </button>
        </section>

        {/* 오른쪽 영역: 그리드 결과 */}
        <section className="flex-1 border border-slate-200 bg-white flex flex-col rounded-lg shadow-sm overflow-hidden">
          <div className="flex-1">
            <HistoryGrid
              filterEqpIds={displayEqpIds}
              dateRange={{ start: startDate, end: endDate }}
              searchText={searchText}
            />
          </div>
        </section>
      </div>
    </div>
  );
}