import EquipmentTree from '@/components/EquipmentTree';
import HistoryGrid from '@/components/HistoryGrid';

export default function HistoryPage() {
  return (
    <div className="flex h-full flex-col p-4 bg-white gap-4 overflow-hidden">
      <div className="flex justify-between items-center border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-700">설비 상태 이력</h1>
        <div className="flex gap-2">
          <input type="text" placeholder="Quick Menu" className="border px-2 py-1 text-sm" />
          <button className="p-1 border rounded">👤</button>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        <section className="w-80 border bg-slate-50 flex flex-col p-3 rounded shadow-sm">
          <h2 className="text-sm font-bold text-emerald-700 border-b border-emerald-200 mb-3 pb-1">검색 조건</h2>
          
          <div className="flex-1 overflow-auto">
            <div className="bg-slate-200 p-1 text-center text-xs font-bold mb-1">설비</div>
            <EquipmentTree />
          </div>

          <div className="mt-4 space-y-2 border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold">조회 기간</span>
              <select className="text-xs border p-1"><option>금일</option></select>
            </div>
            <div className="space-y-1">
              <input type="datetime-local" className="w-full text-xs border p-1" defaultValue="2026-02-19T00:00" />
              <input type="datetime-local" className="w-full text-xs border p-1" defaultValue="2026-02-20T00:00" />
            </div>
            <button className="w-full bg-emerald-500 text-white py-2 rounded font-bold hover:bg-emerald-600">조회</button>
          </div>
        </section>

        <section className="flex-1 flex flex-col bg-white rounded-md shadow-sm border border-slate-300 overflow-hidden">
          <div className="bg-slate-800 text-white p-2 flex justify-between items-center">
            <span className="text-sm font-bold">설비 상태 이력 리스트</span>
            <span className="text-xs opacity-80">Total: 2 items</span>
          </div>
          
          <div className="flex-1">
            <HistoryGrid />
          </div>
        </section>
      </div>
    </div>
  );
}