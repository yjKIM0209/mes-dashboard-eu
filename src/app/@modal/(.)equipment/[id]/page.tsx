"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import EquipmentDetailContent from "@/components/EquipmentDetailContent";

export default function EquipmentModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [router]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">
        <button
          onClick={() => router.back()}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-20 text-slate-400"
        >
          ✕
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
          <EquipmentDetailContent id={id} />
        </div>
      </div>
    </div>
  );
}
