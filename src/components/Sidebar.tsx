"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    { name: '대시보드', href: '/', icon: '📊' },
    { name: '설비 관리', href: '/equipment', icon: '⚙️' },
    { name: '생산 리포트', href: '/reports', icon: '📈' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
      <div className="p-6 text-2xl font-black border-b border-slate-800 tracking-tighter text-blue-400">
        🏭 FACTORY
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menus.map((menu) => {
          const isActive = pathname === menu.href || (menu.href !== '/' && pathname.startsWith(menu.href));
          
          return (
            <Link 
              key={menu.href}
              href={menu.href} 
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span className="text-xl">{menu.icon}</span>
              <span className="font-medium">{menu.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 p-3 rounded-lg text-xs text-slate-500 border border-slate-700">
          <p>접속 계정: admin_user</p>
          <div className="flex items-center gap-2 mt-1 text-green-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>시스템 정상 운영 중</span>
          </div>
        </div>
      </div>
    </aside>
  );
}