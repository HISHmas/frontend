// src/app/tree/components/LettersModal.tsx
'use client';

import { useState } from 'react';

const MOCK_LETTERS = [
  {
    id: 'l1',
    from: '수빈',
    content: '메리 크리스마스! 올해도 행복하자 🎄',
    createdAt: '2025-11-20',
  },
  {
    id: 'l2',
    from: '민지',
    content: '트리 너무 예쁘다!! 선물 많이 받아 🎁',
    createdAt: '2025-11-21',
  },
  {
    id: 'l3',
    from: '영훈',
    content: '내년엔 같이 여행가자~ ✈️',
    createdAt: '2025-11-22',
  },
];

export default function LettersModal({
                                       open,
                                       onClose,
                                     }: {
  open: boolean;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<(typeof MOCK_LETTERS)[number] | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      {/* dim */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

  {/* sheet */}
  <div className="absolute bottom-0 w-full max-w-[414px] bg-white rounded-t-3xl p-5 pb-7 animate-[slideUp_0.2s_ease-out]">
    {/* header */}
    <div className="flex items-center justify-between mb-3">
  <h3 className="text-lg font-bold text-green-800">📮 편지함</h3>
  <button onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-600">
            ✕
          </button>
          </div>

  {/* 리스트(스크롤) */}
  <div className="max-h-[60vh] overflow-y-auto pr-1 space-y-2">
    {MOCK_LETTERS.map((letter) => (
        <button
          key={letter.id}
      onClick={() => setSelected(letter)}
  className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-xl p-3 transition"
  >
  <div className="flex items-center justify-between">
  <p className="font-semibold text-gray-800">From. {letter.from}</p>
  <p className="text-xs text-gray-400">{letter.createdAt}</p>
    </div>
    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{letter.content}</p>
    </button>
))}
  </div>

  {/* 상세 보기 */}
  {selected && (
    <div className="fixed inset-0 z-[60] flex justify-center">
    <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
  <div className="absolute bottom-0 w-full max-w-[414px] bg-white rounded-t-3xl p-6 pb-8 animate-[slideUp_0.2s_ease-out]">
  <div className="flex items-center justify-between mb-4">
  <div>
    <p className="text-sm text-gray-500">From.</p>
    <p className="text-lg font-bold text-gray-800">{selected.from}</p>
    </div>
    <button onClick={() => setSelected(null)} className="text-2xl text-gray-400 hover:text-gray-600">
                  ✕
                </button>
                </div>

                <div className="text-sm text-gray-400 mb-3">{selected.createdAt}</div>
    <div className="max-h-[55vh] overflow-y-auto text-gray-800 leading-relaxed whitespace-pre-wrap">
    {selected.content}
    </div>

    <button
    onClick={() => setSelected(null)}
    className="w-full mt-5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition"
      >
      목록으로
      </button>
      </div>
      </div>
  )}

  <style jsx global>{`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}</style>
  </div>
  </div>
);
}
