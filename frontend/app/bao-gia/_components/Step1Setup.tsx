'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Province, Distributor, Package, SEGMENT_LABEL, PROPERTY_TYPE_LABEL, formatVND } from '@/lib/types';
import { api } from '@/lib/api';
import { MapPin, Building, Home, ArrowRight, Package as PackageIcon, Loader2, AlertCircle, ChevronDown, Check } from 'lucide-react';

export interface SetupResult {
  distributorId: string;
  distributorName: string;
  villaSurchargePct: number;
  packageId: string;
  packageName: string;
  propertyType: 'APARTMENT' | 'VILLA';
  sessionId: string;
}

interface Props {
  onComplete: (result: SetupResult) => void;
}

const fade = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25 } };

function ProvinceDropdown({
  provinces,
  value,
  onChange,
}: {
  provinces: Province[];
  value: number | null;
  onChange: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = provinces.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const selected = provinces.find(p => p.id === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl text-left hover:border-[#635bff] transition-colors"
      >
        <MapPin className="w-4 h-4 text-[#635bff] flex-shrink-0" />
        <span className={`flex-1 text-sm ${selected ? 'text-[#0a2540] font-medium' : 'text-gray-400'}`}>
          {selected?.name ?? 'Chọn tỉnh / thành phố'}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-2 border-b border-gray-100">
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full px-3 py-1.5 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-[#635bff]/20"
              />
            </div>
            <div className="max-h-52 overflow-y-auto">
              {filtered.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => { onChange(p.id); setOpen(false); setSearch(''); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    value === p.id ? 'bg-purple-50 text-[#635bff] font-semibold' : 'hover:bg-gray-50 text-[#0a2540]'
                  }`}
                >
                  {p.name}
                </button>
              ))}
              {filtered.length === 0 && <div className="p-4 text-sm text-gray-400 text-center">Không tìm thấy</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Step1Setup({ onComplete }: Props) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [distributorId, setDistributorId] = useState<string | null>(null);
  const [propertyType, setPropertyType] = useState<'APARTMENT' | 'VILLA' | null>(null);
  const [packageId, setPackageId] = useState<string | null>(null);

  const [loadingDist, setLoadingDist] = useState(false);
  const [loadingPkg, setLoadingPkg] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.provinces().then(setProvinces).catch(() => setError('Không tải được danh sách tỉnh thành'));
  }, []);

  useEffect(() => {
    if (!provinceId) { setDistributors([]); setDistributorId(null); return; }
    setLoadingDist(true);
    setDistributorId(null);
    setPackages([]);
    setPackageId(null);
    api.distributors(provinceId)
      .then(setDistributors)
      .catch(() => setError('Không tải được danh sách đại lý'))
      .finally(() => setLoadingDist(false));
  }, [provinceId]);

  useEffect(() => {
    if (!distributorId) { setPackages([]); setPackageId(null); return; }
    setLoadingPkg(true);
    setPackageId(null);
    api.packages(distributorId)
      .then(setPackages)
      .catch(() => setError('Không tải được gói nội thất'))
      .finally(() => setLoadingPkg(false));
  }, [distributorId]);

  const canSubmit = distributorId && propertyType && packageId;

  async function handleSubmit() {
    if (!distributorId || !propertyType || !packageId) return;
    setSubmitting(true);
    setError(null);
    try {
      const session = await api.createSession({ distributorId, packageId, propertyType });
      const dist = distributors.find(d => d.id === distributorId)!;
      const pkg = packages.find(p => p.id === packageId)!;
      onComplete({
        distributorId,
        distributorName: dist.name,
        villaSurchargePct: propertyType === 'VILLA' ? parseFloat(dist.villa_surcharge_pct ?? '0') : 0,
        packageId,
        packageName: pkg.name ?? (pkg.segment ? SEGMENT_LABEL[pkg.segment] : packageId),
        propertyType,
        sessionId: session.id,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setSubmitting(false);
    }
  }

  const selectedDist = distributors.find(d => d.id === distributorId);

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        <motion.div {...fade}>
          <h1 className="text-2xl font-bold text-[#0a2540]">Thiết lập cấu hình</h1>
          <p className="text-sm text-[#425466] mt-1">Chọn khu vực, đại lý và gói nội thất phù hợp để bắt đầu</p>
        </motion.div>

        {error && (
          <motion.div {...fade} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </motion.div>
        )}

        {/* Step A: Province */}
        <motion.div {...fade} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-[#635bff] text-white text-xs font-bold flex items-center justify-center">1</div>
            <span className="font-semibold text-sm text-[#0a2540]">Khu vực</span>
          </div>
          <ProvinceDropdown provinces={provinces} value={provinceId} onChange={id => { setProvinceId(id); setDistributorId(null); }} />
        </motion.div>

        {/* Step B: Distributor */}
        <AnimatePresence>
          {provinceId && (
            <motion.div {...fade} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center ${distributorId ? 'bg-[#635bff]' : 'bg-gray-300'}`}>2</div>
                <span className="font-semibold text-sm text-[#0a2540]">Đại lý</span>
              </div>
              {loadingDist ? (
                <div className="flex items-center gap-2 text-sm text-gray-400 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Đang tải...
                </div>
              ) : distributors.length === 0 ? (
                <p className="text-sm text-gray-400">Không có đại lý trong khu vực này</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {distributors.map(d => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDistributorId(d.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                        distributorId === d.id
                          ? 'border-[#635bff] bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#635bff] to-[#06b6d4] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {d.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#0a2540] truncate">{d.name}</div>
                        {d.code && <div className="text-xs text-gray-400">{d.code}</div>}
                      </div>
                      {distributorId === d.id && <Check className="w-4 h-4 text-[#635bff] flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step C: Property type */}
        <AnimatePresence>
          {distributorId && (
            <motion.div {...fade} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center ${propertyType ? 'bg-[#635bff]' : 'bg-gray-300'}`}>3</div>
                <span className="font-semibold text-sm text-[#0a2540]">Loại bất động sản</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(['APARTMENT', 'VILLA'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPropertyType(type)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                      propertyType === type ? 'border-[#635bff] bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {type === 'APARTMENT' ? (
                      <Building className={`w-8 h-8 ${propertyType === type ? 'text-[#635bff]' : 'text-gray-400'}`} />
                    ) : (
                      <Home className={`w-8 h-8 ${propertyType === type ? 'text-[#635bff]' : 'text-gray-400'}`} />
                    )}
                    <span className={`text-sm font-medium ${propertyType === type ? 'text-[#635bff]' : 'text-[#425466]'}`}>
                      {PROPERTY_TYPE_LABEL[type]}
                    </span>
                    {type === 'VILLA' && selectedDist && parseFloat(selectedDist.villa_surcharge_pct) > 0 && (
                      <span className="text-[10px] text-orange-500 font-medium">
                        +{selectedDist.villa_surcharge_pct}% phụ phí
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step D: Package */}
        <AnimatePresence>
          {distributorId && propertyType && (
            <motion.div {...fade} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center ${packageId ? 'bg-[#635bff]' : 'bg-gray-300'}`}>4</div>
                <span className="font-semibold text-sm text-[#0a2540]">Gói nội thất</span>
              </div>
              {loadingPkg ? (
                <div className="flex items-center gap-2 text-sm text-gray-400 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Đang tải...
                </div>
              ) : packages.length === 0 ? (
                <p className="text-sm text-gray-400">Đại lý này chưa có gói nội thất</p>
              ) : (
                <div className="space-y-3">
                  {packages.map(pkg => {
                    const segLabel = pkg.segment ? SEGMENT_LABEL[pkg.segment] : null;
                    const basePrice = parseFloat(pkg.base_price ?? '0');
                    const discount = parseFloat(pkg.package_discount_amount ?? '0');
                    const isSelected = packageId === pkg.id;

                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setPackageId(pkg.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                          isSelected ? 'border-[#635bff] bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-[#635bff]' : 'bg-gray-100'
                        }`}>
                          <PackageIcon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-[#0a2540]">
                              {pkg.name ?? segLabel ?? 'Gói tiêu chuẩn'}
                            </span>
                            {segLabel && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                pkg.segment === 'HIGH'
                                  ? 'bg-amber-100 text-amber-700'
                                  : pkg.segment === 'MID'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {segLabel.toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-0.5">
                            {basePrice > 0 && (
                              <span className="text-xs text-gray-500">Từ {formatVND(basePrice)}</span>
                            )}
                            {discount > 0 && (
                              <span className="text-xs font-semibold text-green-600">
                                Giảm {formatVND(discount)}
                              </span>
                            )}
                          </div>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-[#635bff] flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <AnimatePresence>
          {canSubmit && (
            <motion.div {...fade}>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #635bff, #06b6d4)' }}
              >
                {submitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Đang khởi tạo...</>
                ) : (
                  <>Bắt đầu cấu hình <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
