"use client";

import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  ValueFormatterParams,
  ICellRendererParams,
  themeQuartz,
} from "ag-grid-community";
import { HistoryData } from "@/types";

ModuleRegistry.registerModules([AllCommunityModule]);

const EQP_NAME_MAP: Record<string, string> = {
  "EQP-1001": "믹서기 #1",
  "EQP-1002": "믹서기 #2",
  "EQP-1003": "충진기 #1",
  "EQP-1004": "비전검사기 #1",
  "EQP-1005": "중량검사기 #1",
};

const generateInitialData = (): HistoryData[] => {
  return Array.from({ length: 50 }).map((_, i) => {
    const eqpId = `EQP-${1001 + i}`;
    return {
      no: i + 1,
      status: i % 5 === 0 ? "점검" : "정상",
      process: ["믹싱", "충진", "포장", "검사"][i % 4],
      factory: "창원공장",
      area: "A-Line",
      eqpId: eqpId,
      eqpName: EQP_NAME_MAP[eqpId] || `미등록 설비(${eqpId})`,
      startTime: "2026-02-19 10:00",
      endTime: "2026-02-19 11:00",
      repairCost: Math.floor(Math.random() * 5000) + 500,
      duration: "01:00",
      memo: "",
    };
  });
};

const staticRowData = generateInitialData();
interface HistoryGridProps {
  filterEqpIds: string[];
  dateRange: { start: string; end: string };
  searchText: string;
}

export default function HistoryGrid({
  filterEqpIds,
  dateRange,
  searchText,
}: HistoryGridProps) {
  const myTheme = themeQuartz.withParams({
    accentColor: "#2563eb",
    headerBackgroundColor: "#f8fafc",
  });

  const filteredData = useMemo(() => {
    let data = staticRowData;

    if (filterEqpIds.length > 0) {
      data = data.filter((item) => filterEqpIds.includes(item.eqpId));
    }

    const start = new Date(dateRange.start).getTime();
    const end = new Date(dateRange.end).getTime();

    return data.filter((item) => {
      const itemTime = new Date(item.startTime).getTime();
      return itemTime >= start && itemTime <= end;
    });
  }, [filterEqpIds, dateRange]);

  const columnDefs = useMemo<ColDef<HistoryData>[]>(
    () => [
      {
        field: "no",
        headerName: "No.",
        width: 70,
        pinned: "left",
        filter: false,
        checkboxSelection: true,
        headerCheckboxSelection: true,
      },
      {
        field: "status",
        headerName: "상태",
        width: 100,
        cellRenderer: (params: ICellRendererParams<HistoryData>) => {
          if (!params.value) return null;
          const color =
            params.value === "정상"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700";
          return (
            <span
              className={`${color} px-2 py-1 rounded-full text-xs font-bold`}
            >
              {params.value}
            </span>
          );
        },
      },
      {
        field: "eqpId",
        headerName: "설비 ID",
        width: 110,
        cellClass: "font-semibold text-slate-600",
      },
      {
        field: "eqpName",
        headerName: "설비명",
        width: 130,
      },
      {
        field: "process",
        headerName: "공정",
        width: 120,
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: { values: ["믹싱", "충진", "포장", "검사"] },
      },
      {
        field: "repairCost",
        headerName: "유지보수비",
        width: 130,
        editable: true,
        valueFormatter: (params: ValueFormatterParams<HistoryData>) => {
          return params.value ? `$ ${params.value.toLocaleString()}` : "$ 0";
        },
        cellClass: "text-right text-blue-700 font-mono",
      },
      {
        field: "memo",
        headerName: "비고",
        minWidth: 180,
        flex: 1,
        editable: true,
        cellEditor: "agTextCellEditor",
      },
      { field: "startTime", headerName: "시작 시간", flex: 1, minWidth: 150 },
      { field: "endTime", headerName: "종료 시간", flex: 1, minWidth: 150 },
    ],
    [],
  );

  return (
    <div className="w-full h-full">
      <AgGridReact<HistoryData>
        theme={myTheme}
        rowData={filteredData}
        columnDefs={columnDefs}
        quickFilterText={searchText}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
          floatingFilter: true,
        }}
        rowSelection={{ mode: "multiRow", headerCheckbox: true }}
        pagination={true}
        paginationPageSize={20}
        rowHeight={45}
        headerHeight={48}
        animateRows={true}
      />
    </div>
  );
}
