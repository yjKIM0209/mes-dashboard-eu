import { mockEquipments } from "@/lib/mockData";
import Link from "next/link";
import LiveTemperature from "@/components/LiveTemperature";
import TemperatureChart from "@/components/TemperatureChart";

export default async function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const equipment = mockEquipments.find((e) => e.id === id);

  if (!equipment) {
    return (
      <div className="p-10 text-center">
        <p className="text-xl font-bold text-red-500">
          설비를 찾을 수 없습니다.
        </p>
        <p className="text-gray-500">요청 ID: {id}</p>
        <Link href="/" className="mt-4 text-blue-500 underline inline-block">
          대시보드로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← 대시보드로 돌아가기
      </Link>

      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            {equipment.name}
          </h1>
          <span className="text-slate-400 font-mono">{equipment.id}</span>
        </div>

        <LiveTemperature initialTemp={equipment.temperature} />

        <div className="mt-8">
          <TemperatureChart />
        </div>

        <div className="grid grid-cols-2 gap-8 border-t pt-6 mt-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">설비 유형</p>
              <p className="text-lg font-medium">{equipment.type}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">현재 상태</p>
              <p
                className={`text-lg font-bold ${equipment.status === "Running" ? "text-green-600" : "text-red-600"}`}
              >
                {equipment.status}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">마지막 점검일</p>
              <p className="text-lg font-medium">{equipment.lastMaintenance}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">누적 가동 시간</p>
              <p className="text-lg font-medium">
                {equipment.operationalHours} 시간
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
