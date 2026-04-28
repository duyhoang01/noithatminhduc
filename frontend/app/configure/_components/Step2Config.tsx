'use client';
import { useState, useEffect, useRef } from 'react';
import { PackageItem, SelectionItem, formatVND } from '@/lib/types';
import { api } from '@/lib/api';
import ProductCard from './ProductCard';
import {
  ArrowLeft, Loader2, AlertCircle, RefreshCw,
  Sofa, UtensilsCrossed, BedDouble, Bath, Home, Info,
} from 'lucide-react';

interface Props {
  sessionId: string;
  packageId: string;
  distributorId: string;
  villaSurchargePct: number;
  onInit: (items: PackageItem[], initialSelections: Record<string, SelectionItem>) => void;
  onSelectionChange: (packageItemId: string, sel: SelectionItem) => void;
  onPricingUpdate: (pricing: { subtotal: number; discount: number; totalPrice: number }) => void;
  onNext: () => void;
  onBack: () => void;
}

function roomIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes('bếp') || n.includes('ăn')) return UtensilsCrossed;
  if (n.includes('ngủ') || n.includes('master')) return BedDouble;
  if (n.includes('tắm') || n.includes('vệ sinh') || n.includes('wc') || n.includes('toilet')) return Bath;
  if (n.includes('khách') || n.includes('living')) return Sofa;
  return Home;
}

export default function Step2Config({
  sessionId,
  packageId,
  distributorId,
  villaSurchargePct,
  onInit,
  onSelectionChange,
  onPricingUpdate,
  onBack,
}: Props) {
  const [packageItems, setPackageItems] = useState<PackageItem[]>([]);
  const [selections, setSelections] = useState<Record<string, SelectionItem>>({});
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestSelectionsRef = useRef(selections);
  latestSelectionsRef.current = selections;

  function buildInitialSelections(items: PackageItem[]): Record<string, SelectionItem> {
    const init: Record<string, SelectionItem> = {};
    for (const item of items) {
      const rawPrice = parseFloat(item.product_variant?.prices[0]?.current_unit_price ?? '0') || 0;
      const unitPrice = Math.round(rawPrice * (1 + villaSurchargePct / 100));
      init[item.id] = {
        variantId: item.product_variant?.id ?? '',
        unitPrice,
        quantity: item.quantity,
        isSelected: item.is_mandatory === true,
        productId: item.product?.id ?? '',
        roomId: item.room?.id ?? '__default__',
        isMandatory: item.is_mandatory === true,
      };
    }
    return init;
  }

  async function loadPackage() {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await api.packageItems(packageId);
      const items = data.package_item;
      setPackageItems(items);
      const init = buildInitialSelections(items);
      setSelections(init);
      onInit(items, init);
      setActiveRoomId(items[0]?.room?.id ?? null);
    } catch {
      setLoadError('Không tải được danh sách sản phẩm. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadPackage(); }, [packageId]);

  // Debounced backend sync
  useEffect(() => {
    if (Object.keys(selections).length === 0) return;
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(async () => {
      const sels = latestSelectionsRef.current;
      const lines = Object.values(sels)
        .filter(s => s.isSelected && s.variantId && s.productId)
        .map(s => ({
          product_id: s.productId,
          variant_id: s.variantId,
          quantity: s.quantity,
          unit_price: s.unitPrice,
        }));
      setSyncing(true);
      try {
        const res = await api.updateLines(sessionId, lines);
        onPricingUpdate(res.pricing);
      } catch {
        // silent
      } finally {
        setSyncing(false);
      }
    }, 700);
    return () => { if (syncTimerRef.current) clearTimeout(syncTimerRef.current); };
  }, [selections, sessionId]);

  function handleChange(packageItemId: string, variantId: string, unitPrice: number, quantity: number, isSelected: boolean) {
    const item = packageItems.find(i => i.id === packageItemId);
    if (!item) return;
    const updated: SelectionItem = {
      variantId,
      unitPrice,
      quantity,
      isSelected,
      productId: item.product?.id ?? '',
      roomId: item.room?.id ?? '__default__',
      isMandatory: item.is_mandatory === true,
    };
    setSelections(prev => ({ ...prev, [packageItemId]: updated }));
    onSelectionChange(packageItemId, updated);
  }

  // Derive rooms
  const rooms = (() => {
    const seen = new Set<string>();
    const result: { id: string; name: string; count: number; selectedCount: number }[] = [];
    for (const item of packageItems) {
      const r = item.room;
      if (!r || seen.has(r.id)) continue;
      seen.add(r.id);
      const roomItems = packageItems.filter(i => i.room?.id === r.id);
      const selectedCount = roomItems.filter(i => selections[i.id]?.isSelected).length;
      result.push({ id: r.id, name: r.name ?? 'Phòng', count: roomItems.length, selectedCount });
    }
    return result;
  })();

  const activeItems = activeRoomId
    ? packageItems.filter(i => i.room?.id === activeRoomId)
    : packageItems;

  const activeRoom = rooms.find(r => r.id === activeRoomId);

  const activeRoomTotal = activeRoomId
    ? packageItems
        .filter(i => i.room?.id === activeRoomId)
        .reduce((sum, i) => {
          const s = selections[i.id];
          return sum + (s?.isSelected ? s.unitPrice * s.quantity : 0);
        }, 0)
    : 0;

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-[#635bff]" />
          <span className="text-sm">Đang tải sản phẩm...</span>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <p className="text-sm text-gray-600">{loadError}</p>
          <button
            onClick={loadPackage}
            className="flex items-center gap-2 px-4 py-2 bg-[#635bff] text-white text-sm rounded-lg font-medium"
          >
            <RefreshCw className="w-4 h-4" /> Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-7rem)]">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-white border-r border-gray-100 flex flex-col overflow-y-auto">
        {/* Back link */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-3.5 text-xs font-semibold text-gray-400 hover:text-[#635bff] transition-colors border-b border-gray-100"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> QUAY LẠI BƯỚC 1
        </button>

        {/* Room list */}
        <nav className="flex-1 p-2 space-y-0.5">
          {rooms.map(r => {
            const isActive = activeRoomId === r.id;
            const RoomIcon = roomIcon(r.name);
            const roomTotal = packageItems
              .filter(i => i.room?.id === r.id)
              .reduce((sum, i) => {
                const s = selections[i.id];
                return sum + (s?.isSelected ? s.unitPrice * s.quantity : 0);
              }, 0);
            return (
              <button
                key={r.id}
                onClick={() => setActiveRoomId(r.id)}
                className={`w-full text-left px-3 py-3 rounded-xl transition-all flex items-center gap-3 ${
                  isActive ? 'bg-purple-50 border border-[#635bff]/20' : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive ? 'bg-[#635bff]' : 'bg-gray-100'
                }`}>
                  <RoomIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-semibold truncate ${isActive ? 'text-[#635bff]' : 'text-[#0a2540]'}`}>
                    {r.name}
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[11px] text-gray-400">{r.selectedCount}/{r.count} sp</span>
                    {roomTotal > 0 && (
                      <span className={`text-[10px] font-bold ${isActive ? 'text-[#635bff]' : 'text-gray-400'}`}>
                        {formatVND(roomTotal)}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {syncing && (
          <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-1.5 text-[11px] text-gray-400">
            <Loader2 className="w-3 h-3 animate-spin" /> Đang cập nhật...
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-[#f6f9fc]">
        <div className="max-w-4xl mx-auto px-6 py-6 space-y-4">
          {/* Room header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#0a2540]">
                {activeRoom?.name ?? 'Tất cả phòng'}
              </h2>
              {activeRoomTotal > 0 && (
                <p className="text-xs text-[#635bff] font-semibold mt-0.5">{formatVND(activeRoomTotal)}</p>
              )}
            </div>
            <span className="text-xs text-gray-400">{activeRoom?.selectedCount ?? 0}/{activeRoom?.count ?? 0} hạng mục đã chọn</span>
          </div>

          {/* Tip banner */}
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
            <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-600 leading-relaxed">
              Các hạng mục <span className="font-semibold">bắt buộc</span> đã được chọn sẵn theo gói. Bạn có thể thêm hoặc bỏ các hạng mục tùy chọn, điều chỉnh kích thước, chất liệu và số lượng.
            </p>
          </div>

          {/* Product cards — vertical stack */}
          <div className="space-y-3">
            {activeItems.map(item => {
              const sel = selections[item.id];
              if (!sel) return null;
              return (
                <ProductCard
                  key={item.id}
                  item={item}
                  distributorId={distributorId}
                  selection={sel}
                  villaSurchargePct={villaSurchargePct}
                  onChange={(variantId, unitPrice, quantity, isSelected) =>
                    handleChange(item.id, variantId, unitPrice, quantity, isSelected)
                  }
                />
              );
            })}
          </div>

          {activeItems.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-sm">
              Phòng này chưa có sản phẩm
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
