'use client';
import { formatVND } from '@/lib/types';
import { ChevronRight } from 'lucide-react';

interface RoomTotal {
  id: string;
  name: string;
  total: number;
}

interface Props {
  isAdherent: boolean;
  roomTotals: RoomTotal[];
  subtotal: number;
  discount: number;
  totalPrice: number;
  onViewQuote?: () => void;
}

export default function PricingBar({ isAdherent, roomTotals, subtotal, discount, totalPrice, onViewQuote }: Props) {
  const vatAmount = Math.round(totalPrice * 0.1);
  const totalWithVat = totalPrice + vatAmount;

  return (
    <div
      className="sticky top-14 z-40 text-white shadow-lg"
      style={{ background: '#0a2540' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-5 overflow-x-auto">
        {/* Label */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Dự toán:</span>
          {isAdherent && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-purple-500 text-white">COMBO</span>
          )}
        </div>

        <div className="w-px h-7 bg-gray-700 flex-shrink-0" />

        {/* Per-room totals */}
        <div className="flex items-center gap-5 flex-1 overflow-x-auto">
          {roomTotals.map((r) => (
            <div key={r.id} className="flex-shrink-0">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider truncate max-w-[110px]">{r.name}</div>
              <div className="text-sm font-bold text-white">{formatVND(r.total)}</div>
            </div>
          ))}
        </div>

        <div className="w-px h-7 bg-gray-700 flex-shrink-0" />

        {/* Total */}
        <div className="flex-shrink-0 text-right">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider">Tổng cộng (VAT)</div>
          <div className="text-lg font-black text-white">{formatVND(totalWithVat)}</div>
        </div>

        {/* CTA */}
        {onViewQuote && (
          <button
            onClick={onViewQuote}
            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#635bff' }}
          >
            Xem báo giá <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
