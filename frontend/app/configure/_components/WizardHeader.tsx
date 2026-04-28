'use client';

interface Props {
  step: 1 | 2 | 3;
  onStepClick?: (s: 1 | 2 | 3) => void;
}

const STEPS = [
  { n: 1, label: 'KHỞI TẠO' },
  { n: 2, label: 'CẤU HÌNH' },
  { n: 3, label: 'BÁO GIÁ' },
] as const;

export default function WizardHeader({ step, onStepClick }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'linear-gradient(135deg,#635bff,#06b6d4)' }}
          >
            D
          </div>
          <span className="font-semibold text-sm tracking-wide" style={{ color: '#0a2540' }}>
            MD-FURNITURE
          </span>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-1">
          {STEPS.map(({ n, label }) => {
            const done = step > n;
            const active = step === n;
            return (
              <button
                key={n}
                onClick={() => done && onStepClick?.(n as 1 | 2 | 3)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  active
                    ? 'text-white'
                    : done
                    ? 'text-[#635bff] hover:bg-purple-50 cursor-pointer'
                    : 'text-gray-400 cursor-default'
                }`}
                style={active ? { background: '#635bff' } : {}}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    active
                      ? 'bg-white text-[#635bff]'
                      : done
                      ? 'bg-[#635bff] text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {done ? '✓' : n}
                </span>
                <span className="hidden sm:block">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="w-24" />
      </div>
    </header>
  );
}
