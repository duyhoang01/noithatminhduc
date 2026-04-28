'use client';
import { useState } from 'react';
import { PackageItem, SelectionItem, formatVND, PROPERTY_TYPE_LABEL } from '@/lib/types';
import { api } from '@/lib/api';
import { SetupResult } from './Step1Setup';
import { ArrowLeft, Printer, Send, CheckCircle, Loader2, AlertCircle, Tag, Sparkles } from 'lucide-react';

interface Props {
  sessionId: string;
  setup: SetupResult;
  packageItems: PackageItem[];
  selections: Record<string, SelectionItem>;
  pricing: { subtotal: number; discount: number; totalPrice: number };
  onConfirm: (orderId: string) => void;
  onBack: () => void;
}

export default function Step3Quote({ sessionId, setup, packageItems, selections, pricing, onConfirm, onBack }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const vatAmount = Math.round(pricing.totalPrice * 0.1);
  const totalWithVat = pricing.totalPrice + vatAmount;

  // Group items by room
  const rooms = (() => {
    const seen = new Set<string>();
    const result: { id: string; name: string }[] = [];
    for (const item of packageItems) {
      const r = item.room;
      if (!r || seen.has(r.id)) continue;
      seen.add(r.id);
      result.push({ id: r.id, name: r.name ?? 'Phòng' });
    }
    return result;
  })();

  const selectedItems = packageItems.filter(item => selections[item.id]?.isSelected);

  async function handleConfirm() {
    setConfirming(true);
    setError(null);
    try {
      const res = await api.confirmOrder(sessionId);
      setOrderId(res.id);
      onConfirm(res.id);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Có lỗi xảy ra khi xác nhận báo giá');
    } finally {
      setConfirming(false);
    }
  }

  // Success state
  if (orderId) {
    return (
      <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0a2540]">Báo giá đã được gửi!</h2>
            <p className="text-sm text-[#425466] mt-2">
              Mã báo giá của bạn là <span className="font-bold text-[#635bff]">#{orderId.slice(-8).toUpperCase()}</span>
            </p>
            <p className="text-sm text-[#425466] mt-1">
              Đội ngũ tư vấn sẽ liên hệ với bạn trong vòng 24 giờ.
            </p>
          </div>
          <div className="bg-[#f6f9fc] rounded-2xl p-5 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tổng giá trị (VAT 10%)</span>
              <span className="font-bold text-[#0a2540]">{formatVND(totalWithVat)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Đại lý</span>
              <span className="font-medium text-[#0a2540]">{setup.distributorName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Gói</span>
              <span className="font-medium text-[#0a2540]">{setup.packageName}</span>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-sm font-medium text-[#425466] hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-4 h-4" /> In báo giá
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-7rem)] bg-[#f6f9fc]">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0a2540]">Báo giá nội thất</h1>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-xs text-gray-400">{setup.distributorName}</span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-400">{PROPERTY_TYPE_LABEL[setup.propertyType]}</span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-400">{setup.packageName}</span>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors print:hidden"
          >
            <Printer className="w-3.5 h-3.5" /> In
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}

        {/* Per-room tables */}
        {rooms.map(room => {
          const roomItems = selectedItems.filter(item => item.room?.id === room.id);
          if (roomItems.length === 0) return null;
          const roomTotal = roomItems.reduce((sum, item) => {
            const s = selections[item.id];
            return sum + (s ? s.unitPrice * s.quantity : 0);
          }, 0);

          return (
            <div key={room.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-[#f6f9fc]">
                <h3 className="text-sm font-semibold text-[#0a2540]">{room.name}</h3>
                <span className="text-sm font-bold text-[#635bff]">{formatVND(roomTotal)}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      <th className="text-left px-5 py-2 font-medium">Sản phẩm</th>
                      <th className="text-left px-3 py-2 font-medium hidden sm:table-cell">Phiên bản</th>
                      <th className="text-center px-3 py-2 font-medium">SL</th>
                      <th className="text-right px-3 py-2 font-medium hidden md:table-cell">Đơn giá</th>
                      <th className="text-right px-5 py-2 font-medium">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {roomItems.map(item => {
                      const sel = selections[item.id];
                      if (!sel) return null;
                      const variant = item.product_variant;
                      const variantLabel =
                        [variant?.size, variant?.material, variant?.color].filter(Boolean).join(' · ') || '—';
                      const lineTotal = sel.unitPrice * sel.quantity;
                      return (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              {item.product?.default_image_url ? (
                                <img
                                  src={item.product.default_image_url}
                                  alt=""
                                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0" />
                              )}
                              <span className="text-sm font-medium text-[#0a2540]">{item.product?.name ?? '—'}</span>
                            </div>
                          </td>
                          <td className="px-3 py-3 text-xs text-gray-500 hidden sm:table-cell">{variantLabel}</td>
                          <td className="px-3 py-3 text-center text-sm text-[#0a2540] font-medium">{sel.quantity}</td>
                          <td className="px-3 py-3 text-right text-xs text-gray-500 hidden md:table-cell">
                            {formatVND(sel.unitPrice)}
                          </td>
                          <td className="px-5 py-3 text-right text-sm font-semibold text-[#0a2540]">
                            {formatVND(lineTotal)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {selectedItems.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-sm">
            Chưa có sản phẩm nào được chọn
          </div>
        )}

        {/* Pricing summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
          <h3 className="text-sm font-semibold text-[#0a2540] mb-3">Tổng kết</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tạm tính</span>
            <span className="text-[#0a2540]">{formatVND(pricing.subtotal)}</span>
          </div>
          {pricing.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1.5 text-green-600">
                <Tag className="w-3.5 h-3.5" /> Giảm giá combo
              </span>
              <span className="text-green-600 font-medium">- {formatVND(pricing.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Sau giảm giá</span>
            <span className="text-[#0a2540]">{formatVND(pricing.totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">VAT (10%)</span>
            <span className="text-[#0a2540]">{formatVND(vatAmount)}</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between">
            <span className="font-bold text-[#0a2540]">Tổng cộng</span>
            <span className="text-xl font-bold text-[#635bff]">{formatVND(totalWithVat)}</span>
          </div>

          {pricing.discount > 0 && (
            <div className="flex items-center gap-2 bg-purple-50 rounded-xl p-3 mt-2">
              <Sparkles className="w-4 h-4 text-[#635bff] flex-shrink-0" />
              <p className="text-xs text-[#635bff] font-medium">
                Bạn đang được hưởng giá combo! Tiết kiệm {formatVND(pricing.discount)}
              </p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between print:hidden pb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-[#0a2540] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại chỉnh sửa
          </button>
          <button
            onClick={handleConfirm}
            disabled={confirming || selectedItems.length === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #635bff, #06b6d4)' }}
          >
            {confirming ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Đang xử lý...</>
            ) : (
              <><Send className="w-4 h-4" /> Xác nhận & Gửi báo giá</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
