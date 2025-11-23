// src/app/tree/components/LetterWriteModal.tsx
'use client';

import { useState } from 'react';

export default function LetterWriteModal({
  open,
  onCloseAction,
  onSubmitAction,
}: {
  open: boolean;
  onCloseAction: () => void;
  onSubmitAction: (payload: { from: string; content: string; createdAt: string }) => void;
}) {
  const [from, setFrom] = useState('');
  const [content, setContent] = useState('');

  if (!open) return null;

  const handleSubmit = () => {
    if (!from.trim() || !content.trim()) {
      alert('이름과 내용을 입력해주세요!');
      return;
    }

    onSubmitAction({
      from,
      content,
      createdAt: new Date().toISOString().slice(0, 10),
    });

    setFrom('');
    setContent('');
    onCloseAction();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <h3 className="text-lg font-bold text-green-800">✉️ 편지 쓰기</h3>
        <button onClick={onCloseAction} className="text-2xl text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {/* 본문 */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div>
          <label className="text-sm text-gray-600">보내는 사람</label>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="이름을 입력해주세요"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            style={{ fontFamily: 'var(--font-ownglyph)' }}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="따뜻한 편지를 남겨주세요 🎄"
            rows={10}
            className="w-full mt-1 px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            style={{ fontFamily: 'var(--font-ownglyph)' }}
          />
        </div>
      </div>

      {/* 저장 버튼 */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-green-600 text-white font-semibold hover:opacity-90"
        style={{ fontFamily: 'var(--font-ownglyph)' }}
      >
        편지 저장하기
      </button>
    </div>
  );
}
