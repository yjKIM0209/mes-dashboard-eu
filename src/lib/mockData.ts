import { Equipment } from '../types/equipment';

export const mockEquipments: Equipment[] = [
  {
    id: 'MC-001',
    name: '사출기 A호기',
    type: 'Injection',
    status: 'Running',
    temperature: 24.8,
    humidity: 42,
    powerUsage: 15.4,
    lastMaintenance: '2026-01-10',
    operationalHours: 2450,
  },
  {
    id: 'MC-002',
    name: '프레스 B호기',
    type: 'Press',
    status: 'Error',
    temperature: 52.3, // 에러 상황을 위한 높은 온도 세팅 테스트
    humidity: 40,
    powerUsage: 0.5,
    lastMaintenance: '2026-02-01',
    operationalHours: 1120,
  },
  {
    id: 'MC-003',
    name: '포장 로봇 C',
    type: 'Robot',
    status: 'Idle',
    temperature: 22.1,
    humidity: 45,
    powerUsage: 2.1,
    lastMaintenance: '2025-12-15',
    operationalHours: 5600,
  }
];