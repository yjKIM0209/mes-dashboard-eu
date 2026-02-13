import { mockEquipments } from "../lib/mockData";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-8 border-b-2 border-blue-500 pb-2 inline-block">
        실시간 설비 모니터링
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEquipments.map((equipment) => (
          <div
            key={equipment.id}
            className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {equipment.type}
                </p>
                <h2 className="text-xl font-bold text-slate-900">
                  {equipment.name}
                </h2>
                <p className="text-sm text-slate-400">{equipment.id}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  equipment.status === "Running"
                    ? "bg-green-100 text-green-700"
                    : equipment.status === "Error"
                      ? "bg-red-100 text-red-700"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                ● {equipment.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">현재 온도</span>
                <span
                  className={`font-semibold ${equipment.temperature > 40 ? "text-red-500" : "text-slate-700"}`}
                >
                  {equipment.temperature}°C
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">전력 사용량</span>
                <span className="font-semibold text-slate-700">
                  {equipment.powerUsage} kW
                </span>
              </div>
            </div>

            <Link href={`/equipment/${equipment.id}`}>
              <button className="w-full mt-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                상세 데이터 보기
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
