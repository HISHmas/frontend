// src/app/tree/components/DecorationBottomSheet.tsx
'use client';

import Image from 'next/image';

export type DecoType = 'sock' | 'circle' | 'candy';

export const DECO_LIST: {
  type: DecoType;
  label: string;
  src: string;
}[] = [
  { type: 'sock', label: '양말', src: '/images/Socks01.png' },
  { type: 'circle', label: '볼', src: '/images/Ornament_Yellow.png' },
  { type: 'candy', label: '사탕', src: '/images/Candycane.png' },
];

interface DecorationBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onPick: (deco: (typeof DECO_LIST)[number]) => void;
}

export default function DecorationBottomSheet({ open, onClose, onPick }: DecorationBottomSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* dim */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* sheet */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="w-full max-w-[414px] bg-white rounded-t-3xl p-6 pb-8 animate-[slideUp_0.2s_ease-out]">
          {/* handle bar */}
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-green-800">장식 선택</h3>
            <button onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-600" aria-label="close">
              ✕
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {DECO_LIST.map((d) => (
              <button
                key={d.type}
                onClick={() => onPick(d)}
                className="aspect-square bg-gray-50 hover:bg-gray-100 rounded-2xl flex flex-col items-center justify-center transition"
              >
                <Image src={d.src} alt={d.label} width={3000} height={3000} className="object-contain" priority={false} />
                <div className="text-xs mt-1 text-gray-700">{d.label}</div>
              </button>
            ))}
          </div>

          <button onClick={onClose} className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition">
            취소
          </button>
        </div>
      </div>

      {/* slide-up animation */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
