'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  MapPin, Building2, Home, Landmark, Warehouse,
  Settings, Gem, ChevronDown,
} from 'lucide-react';
import { PackageItem, SelectionItem } from '@/lib/types';
import WizardHeader from '../configure/_components/WizardHeader';
import PricingBar from '../configure/_components/PricingBar';
import Step2Config from '../configure/_components/Step2Config';
import Step3Quote from './_components/Step3Quote';

const API = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001').replace(/\/+$/, '') + '/api';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function apiFetch<T>(path: string, method: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface Province { id: number; name: string; }
interface Distributor { id: string; name: string; villa_surcharge_pct: string; }
interface Package { id: string; name: string | null; segment: string | null; base_price: string | null; }

// ── Constants ─────────────────────────────────────────────────────────────────

const PROPERTY_GROUPS = [
  { id: 'CHUNG_CU',  label: 'CHUNG CƯ',             icon: Building2, backendType: 'APARTMENT' as const },
  { id: 'TOWNHOUSE', label: 'TOWNHOUSE / SHOPHOUSE', icon: Warehouse, backendType: 'APARTMENT' as const },
  { id: 'VILLA',     label: 'VILLA / BIỆT THỰ',      icon: Landmark,  backendType: 'VILLA'     as const },
];

const PROPERTY_SUBTYPES: Record<string, string[]> = {
  CHUNG_CU:  ['STUDIO', '1BR', '1BR+', '2BR', '2BR+', '3BR'],
  TOWNHOUSE: ['TOWNHOUSE 4M', 'TOWNHOUSE 8M', 'SHOPHOUSE'],
  VILLA:     ['BIỆT THỰ ĐƠN LẬP', 'BIỆT THỰ SONG LẬP'],
};

const SUBTYPE_MULTIPLIER: Record<string, number> = {
  'STUDIO': 0.75, '1BR': 0.9, '1BR+': 1.0,
  '2BR': 1.35, '2BR+': 1.65, '3BR': 2.1,
  'TOWNHOUSE 4M': 2.5, 'TOWNHOUSE 8M': 2.92, 'SHOPHOUSE': 3.3,
  'BIỆT THỰ ĐƠN LẬP': 4.17, 'BIỆT THỰ SONG LẬP': 3.65,
};

const PKG_META: Record<string, { label: string; desc: string }> = {
  LOW:  { label: 'Gói Tiêu chuẩn', desc: 'Gỗ MDF Thái Lan, Phụ kiện Ivan' },
  MID:  { label: 'Gói Nâng cao',   desc: 'Gỗ MDF An Cường, Phụ kiện Hafele' },
  HIGH: { label: 'Gói Sang trọng', desc: 'Gỗ Sồi/Gỗ Đỏ, Phụ kiện Blum' },
};

function fmtVND(n: number) {
  return n.toLocaleString('vi-VN') + 'đ';
}

function getDisplayPrice(pkg: Package, subtype: string): number | null {
  if (!subtype || !pkg.base_price) return null;
  const base = parseFloat(pkg.base_price);
  if (!base) return null;
  return Math.round(base * (SUBTYPE_MULTIPLIER[subtype] ?? 1));
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ConfiguratorPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState('');

  // Step 1 state
  const [provinces, setProvinces]         = useState<Province[]>([]);
  const [distributors, setDistributors]   = useState<Distributor[]>([]);
  const [packages, setPackages]           = useState<Package[]>([]);
  const [provinceId, setProvinceId]       = useState('');
  const [distributorId, setDistributorId] = useState('');
  const [propertyGroup, setPropertyGroup] = useState('');
  const [propertySubtype, setPropertySubtype] = useState('');
  const [packageId, setPackageId]         = useState('');
  const [selectedSegment, setSelectedSegment] = useState('');
  const [loadingStep2, setLoadingStep2]   = useState(false);

  // Step 2 state
  const [sessionId, setSessionId]                   = useState('');
  const [villaSurchargePct, setVillaSurchargePct]   = useState(0);
  const [packageItems, setPackageItems]             = useState<PackageItem[]>([]);
  const [selections, setSelections]                 = useState<Record<string, SelectionItem>>({});
  const [pricing, setPricing]                       = useState<{ subtotal: number; discount: number; totalPrice: number } | null>(null);

  // Derived
  const propertyType = PROPERTY_GROUPS.find(g => g.id === propertyGroup)?.backendType ?? 'APARTMENT';
  const pkgBySegment = Object.fromEntries(packages.filter(p => p.segment).map(p => [p.segment!, p]));
  const canProceed   = !!(distributorId && propertyGroup && propertySubtype && packageId);

  const rooms = useMemo(() => {
    const seen = new Set<string>();
    const result: { id: string; name: string }[] = [];
    for (const item of packageItems) {
      const r = item.room;
      if (!r || seen.has(r.id)) continue;
      seen.add(r.id);
      result.push({ id: r.id, name: r.name ?? 'Phòng' });
    }
    return result;
  }, [packageItems]);

  const roomTotals = useMemo(() => rooms.map(r => ({
    id: r.id,
    name: r.name,
    total: Object.values(selections)
      .filter(s => s.isSelected && s.roomId === r.id)
      .reduce((sum, s) => sum + s.unitPrice * s.quantity, 0),
  })), [rooms, selections]);

  const isAdherent = (pricing?.discount ?? 0) > 0;

  // ── Data loading ──────────────────────────────────────────────────────────

  useEffect(() => {
    get<Province[]>('/catalog/provinces')
      .then(setProvinces)
      .catch(() => setError('Không tải được tỉnh thành'));
  }, []);

  useEffect(() => {
    if (!provinceId) return;
    get<Distributor[]>(`/distributors?provinceId=${provinceId}`)
      .then(data => { setDistributorId(''); setDistributors(data); setPackages([]); setPackageId(''); setSelectedSegment(''); })
      .catch(() => setError('Không tải được đại lý'));
  }, [provinceId]);

  useEffect(() => {
    if (!distributorId) return;
    get<Package[]>(`/packages?distributorId=${distributorId}`)
      .then(data => { setPackageId(''); setSelectedSegment(''); setPackages(data); })
      .catch(() => setError('Không tải được gói nội thất'));
  }, [distributorId]);

  // ── Step 1 actions ────────────────────────────────────────────────────────

  function selectGroup(id: string) {
    setPropertyGroup(id);
    setPropertySubtype('');
    setPackageId('');
    setSelectedSegment('');
  }

  function selectSubtype(sub: string) {
    setPropertySubtype(sub);
    setPackageId('');
    setSelectedSegment('');
  }

  function selectPackage(segment: string) {
    const pkg = pkgBySegment[segment];
    if (!pkg) return;
    setSelectedSegment(segment);
    setPackageId(pkg.id);
  }

  async function goToStep2() {
    setError('');
    setLoadingStep2(true);
    try {
      const dist = distributors.find(d => d.id === distributorId);
      setVillaSurchargePct(parseFloat(dist?.villa_surcharge_pct ?? '0') || 0);
      const session = await apiFetch<{ id: string }>('/sessions', 'POST', { distributorId, packageId, propertyType });
      setSessionId(session.id);
      setStep(2);
    } catch {
      setError('Không tạo được phiên làm việc. Vui lòng thử lại.');
    } finally {
      setLoadingStep2(false);
    }
  }

  function handleStepClick(s: 1 | 2 | 3) {
    if (s < step) setStep(s);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <WizardHeader step={step} onStepClick={handleStepClick} />

      <div className="pt-14">
        {/* PricingBar — hiện từ step 2 */}
        {step >= 2 && (
          <PricingBar
            isAdherent={isAdherent}
            roomTotals={roomTotals}
            subtotal={pricing?.subtotal ?? 0}
            discount={pricing?.discount ?? 0}
            totalPrice={pricing?.totalPrice ?? 0}
            onViewQuote={step === 2 ? () => setStep(3) : undefined}
          />
        )}

        {/* ── Step 1 ── */}
        {step === 1 && (
          <div className="px-4 py-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-black uppercase tracking-widest text-[#0a2540]">
                  Khởi tạo dự án nội thất
                </h1>
                <p className="text-sm text-[#425466] mt-2">
                  Thiết lập các thông số cơ bản để nhận báo giá dự kiến
                </p>
              </div>

              {error && (
                <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">

                {/* Province + Distributor */}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <SectionLabel icon={MapPin} label="Tỉnh / Thành phố" />
                    <div className="relative">
                      <select
                        value={provinceId}
                        onChange={e => setProvinceId(e.target.value)}
                        className="w-full appearance-none px-4 py-3 pr-9 border border-gray-200 rounded-xl text-sm text-[#0a2540] bg-white focus:outline-none focus:border-[#635bff] transition-colors"
                      >
                        <option value="">Chọn địa điểm...</option>
                        {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <SectionLabel icon={Building2} label="Nhà phân phối" />
                    <div className="relative">
                      <select
                        value={distributorId}
                        onChange={e => setDistributorId(e.target.value)}
                        disabled={!provinceId || distributors.length === 0}
                        className="w-full appearance-none px-4 py-3 pr-9 border border-gray-200 rounded-xl text-sm text-[#0a2540] bg-white focus:outline-none focus:border-[#635bff] transition-colors disabled:text-gray-400 disabled:bg-gray-50"
                      >
                        <option value="">
                          {!provinceId ? 'Chọn tỉnh trước' : distributors.length === 0 ? 'Không có đại lý' : 'Chọn nhà phân phối'}
                        </option>
                        {distributors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100" />

                {/* Property group */}
                <div>
                  <SectionLabel icon={Home} label="Nhóm loại hình" />
                  <div className="grid grid-cols-3 gap-3">
                    {PROPERTY_GROUPS.map(g => {
                      const Icon = g.icon;
                      const active = propertyGroup === g.id;
                      return (
                        <button
                          key={g.id}
                          onClick={() => selectGroup(g.id)}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all ${
                            active ? 'border-[#635bff] bg-[#f0eeff]' : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-[#635bff]' : 'text-gray-400'}`} />
                          <span className={`text-xs font-bold uppercase tracking-wide leading-tight ${active ? 'text-[#635bff]' : 'text-[#425466]'}`}>
                            {g.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sub-type */}
                {propertyGroup && (
                  <>
                    <div className="border-t border-gray-100" />
                    <div>
                      <SectionLabel
                        icon={Settings}
                        label={`Chi tiết: ${PROPERTY_GROUPS.find(g => g.id === propertyGroup)?.label}`}
                      />
                      <div className="flex flex-wrap gap-2">
                        {PROPERTY_SUBTYPES[propertyGroup].map(sub => {
                          const active = propertySubtype === sub;
                          return (
                            <button
                              key={sub}
                              onClick={() => selectSubtype(sub)}
                              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                                active
                                  ? 'bg-[#635bff] border-[#635bff] text-white'
                                  : 'border-gray-200 text-[#425466] hover:border-gray-300 bg-white'
                              }`}
                            >
                              {sub}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                <div className="border-t border-gray-100" />

                {/* Packages */}
                <div>
                  <SectionLabel icon={Gem} label="Gói vật liệu hoàn thiện" />
                  <div className="grid grid-cols-3 gap-4">
                    {(['LOW', 'MID', 'HIGH'] as const).map(seg => {
                      const meta = PKG_META[seg];
                      const pkg = pkgBySegment[seg];
                      const active = selectedSegment === seg;
                      const price = pkg && propertySubtype ? getDisplayPrice(pkg, propertySubtype) : null;
                      const canSelect = !!pkg && !!propertySubtype;
                      return (
                        <button
                          key={seg}
                          onClick={() => canSelect && selectPackage(seg)}
                          disabled={!canSelect}
                          className={`text-left p-4 rounded-xl border transition-all ${
                            active
                              ? 'border-[#635bff] bg-[#f0eeff]'
                              : canSelect
                              ? 'border-gray-200 hover:border-gray-300 bg-white'
                              : 'border-gray-100 bg-gray-50 cursor-default'
                          }`}
                        >
                          <div className={`font-semibold text-sm ${active ? 'text-[#635bff]' : 'text-[#0a2540]'}`}>
                            {meta.label}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-0.5">{meta.desc}</div>
                          <div className={`mt-2 text-xs font-semibold ${price ? 'text-[#635bff]' : 'text-gray-400'}`}>
                            {price ? `Giá: ${fmtVND(price)}` : 'Chọn loại căn hộ để xem giá'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={goToStep2}
                  disabled={!canProceed || loadingStep2}
                  className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
                    canProceed && !loadingStep2
                      ? 'bg-[#0a2540] text-white hover:bg-[#0d3060]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {loadingStep2 ? 'Đang khởi tạo...' : 'Tiếp tục thiết kế chi tiết  ›'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && sessionId && (
          <Step2Config
            sessionId={sessionId}
            packageId={packageId}
            distributorId={distributorId}
            villaSurchargePct={villaSurchargePct}
            onInit={(items, init) => { setPackageItems(items); setSelections(init); }}
            onSelectionChange={(id, sel) => setSelections(prev => ({ ...prev, [id]: sel }))}
            onPricingUpdate={setPricing}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {/* ── Step 3 ── */}
        {step === 3 && pricing && (
          <Step3Quote
            roomTotals={roomTotals}
            packageItems={packageItems}
            selections={selections}
            pricing={pricing}
            onBack={() => setStep(2)}
          />
        )}
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-3">
      <Icon className="w-3 h-3" />
      {label}
    </div>
  );
}
