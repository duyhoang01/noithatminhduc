'use client';
import { useState, useEffect, useRef } from 'react';
import { PackageItem, Variant, ProductImage, formatVND } from '@/lib/types';
import { api } from '@/lib/api';
import { Check, Ruler, Layers, Globe, Image as ImageIcon, Minus, Plus } from 'lucide-react';

interface SelectionState {
  variantId: string;
  unitPrice: number;
  quantity: number;
  isSelected: boolean;
}

interface Props {
  item: PackageItem;
  distributorId: string;
  selection: SelectionState;
  villaSurchargePct: number;
  onChange: (variantId: string, unitPrice: number, quantity: number, isSelected: boolean) => void;
}

function findBestVariant(variants: Variant[], size: string | null, material: string | null, color: string | null) {
  return (
    variants.find(v => v.size === size && v.material === material && v.color === color) ??
    variants.find(v => v.size === size && v.material === material) ??
    variants.find(v => v.size === size) ??
    variants[0] ??
    null
  );
}

function AttrGroup({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1 text-[10px] text-gray-400 uppercase font-semibold tracking-wider mb-1.5">
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
        active ? 'bg-[#635bff] border-[#635bff] text-white' : 'border-gray-200 text-[#425466] hover:border-[#635bff] hover:text-[#635bff]'
      }`}
    >
      {label}
    </button>
  );
}

export default function ProductCard({ item, distributorId, selection, villaSurchargePct, onChange }: Props) {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeImageType, setActiveImageType] = useState<string | null>(null);
  const [variantImages, setVariantImages] = useState<ProductImage[]>(
    item.product_variant?.product_images ?? item.product?.product_images ?? [],
  );

  const [selectedSize, setSelectedSize] = useState<string | null>(item.product_variant?.size ?? null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(item.product_variant?.material ?? null);
  const [selectedColor, setSelectedColor] = useState<string | null>(item.product_variant?.color ?? null);

  const userInteracted = useRef(false);

  const resolvePrice = (raw: string | null | undefined) =>
    Math.round((parseFloat(raw ?? '0') || 0) * (1 + villaSurchargePct / 100));

  // Load variants on mount
  useEffect(() => {
    if (!item.product?.id) return;
    setLoading(true);
    api
      .variants(item.product.id, distributorId)
      .then(v => {
        setVariants(v);
        const cur = v.find(x => x.id === selection.variantId) ?? v[0];
        if (cur) {
          setSelectedSize(cur.size ?? null);
          setSelectedMaterial(cur.material ?? null);
          setSelectedColor(cur.color ?? null);
          setVariantImages(cur.product_images.length > 0 ? cur.product_images : (item.product?.product_images ?? []));
        }
      })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.product?.id, distributorId]);

  // Resolve variant when user changes an attr chip
  useEffect(() => {
    if (!userInteracted.current || variants.length === 0) return;
    const match = findBestVariant(variants, selectedSize, selectedMaterial, selectedColor);
    if (!match) return;
    setVariantImages(match.product_images.length > 0 ? match.product_images : (item.product?.product_images ?? []));
    if (match.id !== selection.variantId) {
      onChange(match.id, resolvePrice(match.prices[0]?.current_unit_price), selection.quantity, selection.isSelected);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSize, selectedMaterial, selectedColor]);

  function selectSize(s: string) { userInteracted.current = true; setSelectedSize(s); }
  function selectMaterial(m: string) { userInteracted.current = true; setSelectedMaterial(m); }
  function selectColor(c: string) { userInteracted.current = true; setSelectedColor(c); }

  const sizes = [...new Set(variants.map(v => v.size).filter(Boolean) as string[])];
  const materials = [...new Set(variants.map(v => v.material).filter(Boolean) as string[])];
  const colors = [...new Set(variants.map(v => v.color).filter(Boolean) as string[])];

  const IMAGE_TYPES = ['3D', '2D', 'REAL', 'TECH'] as const;
  const availableTypes = IMAGE_TYPES.filter(t => variantImages.some(img => img.image_type === t));
  const currentType = activeImageType ?? (availableTypes[0] ?? null);
  const displayImage = currentType
    ? variantImages.find(img => img.image_type === currentType)
    : variantImages.find(img => img.is_primary) ?? variantImages[0];

  const lineTotal = selection.unitPrice * selection.quantity;

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
        selection.isSelected ? 'border-[#635bff]' : 'border-transparent shadow-sm'
      }`}
    >
      <div className="flex min-h-[220px]">
        {/* Left: image + price */}
        <div className="w-48 flex-shrink-0 flex flex-col">
          <div className="relative flex-1 bg-gray-50 overflow-hidden">
            {displayImage?.public_url ? (
              <img
                src={displayImage.public_url}
                alt={item.product?.name ?? ''}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center min-h-[160px]">
                <ImageIcon className="w-10 h-10 text-gray-200" />
              </div>
            )}

            {/* Checkmark overlay */}
            <div
              className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
                selection.isSelected ? 'bg-[#635bff]' : 'bg-white/80'
              }`}
            >
              {selection.isSelected && <Check className="w-4 h-4 text-white" />}
            </div>

            {/* Image type tabs */}
            {availableTypes.length > 1 && (
              <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1">
                {availableTypes.map(t => (
                  <button
                    key={t}
                    onClick={() => setActiveImageType(t)}
                    className={`text-[9px] px-1.5 py-0.5 rounded font-medium transition-all ${
                      currentType === t ? 'bg-[#635bff] text-white' : 'bg-white/80 text-gray-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price block */}
          <div className="px-3 py-2.5 border-t border-gray-100">
            <div className="text-[9px] text-gray-400 uppercase font-semibold tracking-wide">Thành tiền hạng mục</div>
            <div className="text-base font-black text-[#635bff] mt-0.5">{formatVND(lineTotal)}</div>
            <div className="text-[9px] text-gray-400 mt-0.5">Gói tính theo: Bộ</div>
            {/* Qty */}
            <div className="flex items-center gap-1 mt-2">
              <button
                onClick={() => onChange(selection.variantId, selection.unitPrice, Math.max(1, selection.quantity - 1), selection.isSelected)}
                disabled={selection.quantity <= 1 || !selection.isSelected}
                className="w-5 h-5 rounded border border-gray-200 flex items-center justify-center hover:border-[#635bff] transition-colors disabled:opacity-30"
              >
                <Minus className="w-2.5 h-2.5" />
              </button>
              <span className="w-5 text-center text-xs font-semibold text-[#0a2540]">{selection.quantity}</span>
              <button
                onClick={() => onChange(selection.variantId, selection.unitPrice, selection.quantity + 1, selection.isSelected)}
                disabled={!selection.isSelected}
                className="w-5 h-5 rounded border border-gray-200 flex items-center justify-center hover:border-[#635bff] transition-colors disabled:opacity-30"
              >
                <Plus className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div className="flex-1 p-5 flex flex-col gap-3 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-xl font-black text-[#0a2540] leading-tight truncate">{item.product?.name ?? '—'}</h3>
              <p className="text-xs text-gray-400 mt-0.5">Tùy biến theo yêu cầu sản xuất riêng biệt.</p>
            </div>
            {!item.is_mandatory && selection.isSelected && (
              <button
                onClick={() => onChange(selection.variantId, selection.unitPrice, selection.quantity, false)}
                className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-pink-500 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors"
              >
                Xóa hạng mục
              </button>
            )}
            {!item.is_mandatory && !selection.isSelected && (
              <button
                onClick={() => onChange(selection.variantId, selection.unitPrice, selection.quantity, true)}
                className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-[#635bff] bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                Thêm vào
              </button>
            )}
          </div>

          {loading ? (
            <div className="text-xs text-gray-400">Đang tải phiên bản...</div>
          ) : (
            <div className="space-y-3">
              {/* Sizes */}
              {sizes.length > 0 && (
                <AttrGroup icon={Ruler} label="Kích thước (RxSxC)">
                  {sizes.map(s => (
                    <Chip key={s} label={s} active={selectedSize === s} onClick={() => selectSize(s)} />
                  ))}
                </AttrGroup>
              )}

              {/* Material + Origin in 2 cols */}
              {(materials.length > 0 || colors.length > 0) && (
                <div className="grid grid-cols-2 gap-4">
                  {materials.length > 0 && (
                    <AttrGroup icon={Layers} label="Cốt gỗ / Vật liệu">
                      {materials.map(m => (
                        <Chip key={m} label={m} active={selectedMaterial === m} onClick={() => selectMaterial(m)} />
                      ))}
                    </AttrGroup>
                  )}
                  {colors.length > 0 && (
                    <AttrGroup icon={Globe} label="Hàng sản xuất / Xuất xứ">
                      {colors.map(c => (
                        <Chip key={c} label={c} active={selectedColor === c} onClick={() => selectColor(c)} />
                      ))}
                    </AttrGroup>
                  )}
                </div>
              )}

              {/* Fallback: no attr data */}
              {sizes.length === 0 && materials.length === 0 && colors.length === 0 && variants.length > 0 && (
                <p className="text-xs text-gray-400">Sản phẩm chỉ có 1 phiên bản</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
