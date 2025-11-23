// src/app/tree/components/LettersModal.tsx
'use client';

import { useState } from 'react';

interface Letter {
  id: string;
  from: string;
  content: string;
  createdAt: string;
}

export default function LettersModal({ open, onCloseAction, letters }: { open: boolean; onCloseAction: () => void; letters: Letter[] }) {
  const [selected, setSelected] = useState<Letter | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col overscroll-contain">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <h3 className="text-lg font-bold text-green-800">📮 편지함</h3>
        <button onClick={onCloseAction} className="text-2xl text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {/* 리스트 OR 상세 */}
      <div className="flex-1 overflow-y-auto p-4">
        {!selected &&
          letters.map((letter) => (
            <button
              key={letter.id}
              onClick={() => setSelected(letter)}
              className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-xl p-4 mb-3 transition"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-800">From. {letter.from}</p>
                <p className="text-xs text-gray-400">{letter.createdAt}</p>
              </div>
              <p className="text-sm text-gray-700 line-clamp-2">{letter.content}</p>
            </button>
          ))}

        {selected && (
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">From.</p>
              <p className="text-lg font-bold text-gray-800">{selected.from}</p>
              <p className="text-xs text-gray-400 mt-1">{selected.createdAt}</p>
            </div>
            <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">{selected.content}</div>
          </div>
        )}
      </div>

      {selected && (
        <button onClick={() => setSelected(null)} className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold">
          목록으로
        </button>
      )}
    </div>
  );
}
