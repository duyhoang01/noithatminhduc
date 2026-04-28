'use client';
import { useState } from 'react';
import { PackageItem, SelectionItem, formatVND } from '@/lib/types';
import {
  ArrowLeft, FileText, Download,
  Sofa, UtensilsCrossed, BedDouble, Bath, Home,
} from 'lucide-react';

interface RoomTotal { id: string; name: string; total: number; }
interface Pricing { subtotal: number; discount: number; totalPrice: number; }

interface Props {
  roomTotals: RoomTotal[];
  packageItems: PackageItem[];
  selections: Record<string, SelectionItem>;
  pricing: Pricing;
  onBack: () => void;
}

function roomMeta(name: string): { Icon: React.ElementType; color: string } {
  const n = name.toLowerCase();
  if (n.includes('bếp') || n.includes('ăn'))                           return { Icon: UtensilsCrossed, color: '#f97316' };
  if (n.includes('ngủ') || n.includes('master') || n.includes('bed'))  return { Icon: BedDouble,       color: '#8b5cf6' };
  if (n.includes('tắm') || n.includes('vệ sinh') || n.includes('wc'))  return { Icon: Bath,            color: '#06b6d4' };
  if (n.includes('khách') || n.includes('living'))                      return { Icon: Sofa,            color: '#635bff' };
  return { Icon: Home, color: '#6b7280' };
}

export default function Step3Quote({ roomTotals, packageItems, selections, pricing, onBack }: Props) {
  const [totalDiscount, setTotalDiscount] = useState(0);

  const vatBase    = pricing.totalPrice - totalDiscount;
  const vatAmount  = Math.round(vatBase * 0.1);
  const grandTotal = vatBase + vatAmount;

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:border-[#635bff] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-500" />
            </button>
            <div>
              <h1 className="text-xl font-black text-[#0a2540]">Báo giá Chi tiết</h1>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5">
                D-FURNITURE ENGINE V4.1
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-green-600 bg-green-50 border border-green-200 hover:bg-green-100 transition-colors">
              <FileText className="w-3.5 h-3.5" /> EXCEL
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white transition-colors"
              style={{ background: '#635bff' }}
            >
              <Download className="w-3.5 h-3.5" /> PDF
            </button>
          </div>
        </div>

        {/* ── Per-room sections ── */}
        {roomTotals.map(room => {
          const { Icon, color } = roomMeta(room.name);
          const roomItems = packageItems.filter(
            item => item.room?.id === room.id && selections[item.id]?.isSelected,
          );

          return (
            <div key={room.id} className="mb-3 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {/* Room header */}
              <div className="flex items-center gap-4 px-5 py-3.5" style={{ background: '#0a2540' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: color }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black text-white uppercase tracking-widest">{room.name}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{roomItems.length} HẠNG MỤC</div>
                </div>

                {/* Per-room discount toggle (UI only, MVP) */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="flex rounded-md overflow-hidden border border-gray-600 text-[10px] font-medium">
                    <span className="px-2 py-1 bg-gray-700 text-gray-300">VNĐ</span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-500">%</span>
                  </div>
                  <input
                    type="number"
                    defaultValue={0}
                    className="w-14 px-2 py-1 rounded-md text-xs text-center bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-[#635bff]"
                  />
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide">THÀNH TIỀN</div>
                  <div className="text-base font-black" style={{ color: '#635bff' }}>{formatVND(room.total)}</div>
                </div>
              </div>

              {/* Product rows */}
              <div className="bg-white divide-y divide-gray-50">
                {roomItems.map(item => {
                  const sel  = selections[item.id];
                  const v    = item.product_variant;
                  const size = v?.size;
                  const mat  = v?.material;
                  const orig = v?.color;
                  const total = sel.unitPrice * sel.quantity;

                  return (
                    <div key={item.id} className="flex items-center justify-between px-5 py-3.5 gap-4">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[#0a2540]">
                          {item.product?.name ?? '—'}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                          {size && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: '#f0eeff', color: '#635bff' }}>
                              KT: {size}
                            </span>
                          )}
                          {mat && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: '#f0eeff', color: '#635bff' }}>
                              VL: {mat}
                            </span>
                          )}
                          {orig && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: '#ecfdf5', color: '#059669' }}>
                              HÀNG: {orig}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-[#0a2540]">{formatVND(total)}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">/ {sel.quantity} BỘ</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* ── Footer: TỔNG DỰ TOÁN ── */}
        <div className="rounded-2xl overflow-hidden mt-4" style={{ background: '#0a2540' }}>
          <div className="px-5 pt-4 pb-1">
            <span className="text-xs font-black text-gray-300 uppercase tracking-widest">% Tổng Dự Toán</span>
          </div>

          <div className="px-5 py-4 grid grid-cols-3 gap-6 items-end">
            {/* Subtotal */}
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1.5">Giá gốc sản phẩm</div>
              <div className="text-xl font-black text-white">{formatVND(pricing.subtotal)}</div>
            </div>

            {/* Manual discount */}
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1.5">Ưu đãi tổng</div>
              <div className="flex items-center gap-1.5">
                <div className="flex rounded-md overflow-hidden border border-gray-600 text-[10px] font-medium">
                  <span className="px-2 py-1.5 bg-gray-700 text-gray-300">VNĐ</span>
                  <span className="px-2 py-1.5 bg-gray-800 text-gray-500">%</span>
                </div>
                <input
                  type="number"
                  value={totalDiscount}
                  onChange={e => setTotalDiscount(Math.max(0, Number(e.target.value)))}
                  className="w-24 px-2 py-1.5 rounded-md text-xs text-center bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-[#635bff]"
                />
              </div>
              {totalDiscount > 0 && (
                <div className="text-[11px] text-green-400 font-semibold mt-1">- {formatVND(totalDiscount)}</div>
              )}
            </div>

            {/* VAT + Grand total */}
            <div className="text-right">
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">VAT (10%)</div>
              <div className="text-sm text-gray-300 mt-0.5">{formatVND(vatAmount)}</div>
              <div className="text-2xl font-black text-white mt-1">{formatVND(grandTotal)}</div>
            </div>
          </div>

          <div className="px-5 pb-5">
            <button className="w-full py-3.5 rounded-xl font-black text-sm text-[#0a2540] bg-white hover:bg-gray-50 transition-colors tracking-widest uppercase">
              Chốt Báo Giá
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
