// src/app/tree/components/buttons/MailboxButton.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/src/stores/useAuthStore';
import Image from 'next/image';

import LettersModal from '../modals/LettersModal';
import LetterWriteModal from '../modals/LetterWriteModal';

interface Letter {
  id: string;
  from: string;
  content: string;
  createdAt: string;
}

export default function MailboxButton() {
  const slug = useParams().slug as string;
  const { user, isLoaded, loadUser } = useAuthStore();

  const [openRead, setOpenRead] = useState(false);
  const [openWrite, setOpenWrite] = useState(false);

  // ✅ UI-only mock letters (회원용 모달 데이터)
  const [mockLetters, setMockLetters] = useState<Letter[]>([
    { id: 'l1', from: '수빈', content: '메리 크리스마스! 올해도 행복하자 🎄', createdAt: '2025-11-20' },
  ]);

  useEffect(() => {
    if (!isLoaded) loadUser();
  }, [isLoaded, loadUser]);

  const isMyTree = !!user && user.loginId === slug;

  const handleClickAction = () => {
    if (isMyTree) setOpenRead(true);
    else setOpenWrite(true);
  };

  // ✅ UI-only 저장 로직 (나중에 API 붙일 곳)
  const handleSubmitLetterAction = (payload: Omit<Letter, 'id'>) => {
    const newLetter: Letter = {
      id: `l-${Date.now()}`,
      ...payload,
    };
    setMockLetters((prev) => [newLetter, ...prev]);
    alert('편지가 저장되었습니다! (UI-only)');
  };

  return (
    <>
      {/* ✅ 우체통 이미지는 항상 동일하게 표시 */}
      <button type="button" onClick={handleClickAction} aria-label="mailbox" className="transition-transform active:scale-95">
        <Image src="/images/Mailbox_v02.png" alt="mailbox" width={75} height={75} priority />
      </button>

      {/* ✅ 회원: 편지함 읽기 */}
      {isMyTree && <LettersModal open={openRead} onCloseAction={() => setOpenRead(false)} letters={mockLetters} />}

      {/* ✅ 비회원: 편지 쓰기 */}
      {!isMyTree && <LetterWriteModal open={openWrite} onCloseAction={() => setOpenWrite(false)} onSubmitAction={handleSubmitLetterAction} />}
    </>
  );
}
