"use client";

import { useState } from 'react';
import { EquipmentNode } from '@/types';

const treeData: EquipmentNode[] = [
  {
    id: 'HWM001',
    name: '[데모 창원공장]',
    children: [
      {
        id: 'HM-AR-001',
        name: '[믹싱 Area]',
        children: [
          { id: 'HM-EQP-MX-001', name: '[믹싱 1호기]' },
          { id: 'HM-EQP-MX-002', name: '[믹싱 2호기]' },
        ]
      }
    ]
  }
];

export default function EquipmentTree() {
  return (
    <div className="text-sm">
      <input type="text" placeholder="Filter" className="w-full p-1 border mb-2 text-xs" />
      <div className="border bg-white h-[400px] overflow-y-auto p-2">
        {treeData.map(node => <TreeNode key={node.id} node={node} />)}
      </div>
    </div>
  );
}

function TreeNode({ node }: { node: EquipmentNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="ml-4">
      <div 
        className="flex items-center gap-1 cursor-pointer hover:bg-blue-50 p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {hasChildren && <span>{isOpen ? '▼' : '▶'}</span>}
        <input type="checkbox" className="mr-1" onClick={(e) => e.stopPropagation()} />
        <span className="truncate">{node.name}</span>
      </div>
      {hasChildren && isOpen && (
        <div className="border-l border-slate-200 ml-2">
          {node.children!.map(child => <TreeNode key={child.id} node={child} />)}
        </div>
      )}
    </div>
  );
}