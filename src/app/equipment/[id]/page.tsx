import Link from "next/link";
import EquipmentDetailContent from "@/components/EquipmentDetailContent";

export default async function EquipmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ← 대시보드로 돌아가기
      </Link>
      <div className="shadow-xl rounded-2xl overflow-hidden max-w-2xl mx-auto">
        <EquipmentDetailContent id={id} />
      </div>
    </div>
  );
}