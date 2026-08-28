'use client';
import { useState, useMemo } from 'react';
import { PackageItem, SelectionItem } from '@/lib/types';
import WizardHeader from './_components/WizardHeader';
import PricingBar from './_components/PricingBar';
import Step1Setup, { SetupResult } from './_components/Step1Setup';
import Step2Config from './_components/Step2Config';
import Step3Quote from './_components/Step3Quote';

type Step = 1 | 2 | 3;

export default function ConfigurePage() {
  const [step, setStep] = useState<Step>(1);
  const [setup, setSetup] = useState<SetupResult | null>(null);
  const [packageItems, setPackageItems] = useState<PackageItem[]>([]);
  const [selections, setSelections] = useState<Record<string, SelectionItem>>({});
  const [pricing, setPricing] = useState<{ subtotal: number; discount: number; totalPrice: number } | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Derived rooms from packageItems
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

  // Per-room totals for PricingBar
  const roomTotals = useMemo(() => {
    return rooms.map(r => {
      const total = Object.values(selections)
        .filter(s => s.isSelected && s.roomId === r.id)
        .reduce((sum, s) => sum + s.unitPrice * s.quantity, 0);
      return { id: r.id, name: r.name, total };
    });
  }, [rooms, selections]);

  const isAdherent = (pricing?.discount ?? 0) > 0;

  function handleStep1Complete(result: SetupResult) {
    setSetup(result);
    setStep(2);
  }

  function handleInit(items: PackageItem[], initialSelections: Record<string, SelectionItem>) {
    setPackageItems(items);
    setSelections(initialSelections);
  }

  function handleSelectionChange(id: string, sel: SelectionItem) {
    setSelections(prev => ({ ...prev, [id]: sel }));
  }

  function handlePricingUpdate(p: { subtotal: number; discount: number; totalPrice: number }) {
    setPricing(p);
  }

  function handleStepClick(s: 1 | 2 | 3) {
    if (s === 1 && step > 1) { setStep(1); return; }
    if (s === 2 && step === 3) { setStep(2); return; }
  }

  const showPricingBar = step >= 2 && pricing !== null;

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <WizardHeader step={step} onStepClick={handleStepClick} />

      <div className="pt-14">
        {showPricingBar && (
          <PricingBar
            isAdherent={isAdherent}
            roomTotals={roomTotals}
            subtotal={pricing!.subtotal}
            discount={pricing!.discount}
            totalPrice={pricing!.totalPrice}
            onViewQuote={step === 2 ? () => setStep(3) : undefined}
          />
        )}

        {step === 1 && <Step1Setup onComplete={handleStep1Complete} />}

        {step === 2 && setup && (
          <Step2Config
            sessionId={setup.sessionId}
            packageId={setup.packageId}
            distributorId={setup.distributorId}
            villaSurchargePct={setup.villaSurchargePct}
            onInit={handleInit}
            onSelectionChange={handleSelectionChange}
            onPricingUpdate={handlePricingUpdate}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && setup && (
          <Step3Quote
            sessionId={setup.sessionId}
            setup={setup}
            packageItems={packageItems}
            selections={selections}
            pricing={pricing ?? { subtotal: 0, discount: 0, totalPrice: 0 }}
            onConfirm={id => { setOrderId(id); }}
            onBack={() => setStep(2)}
          />
        )}
      </div>
    </div>
  );
}
