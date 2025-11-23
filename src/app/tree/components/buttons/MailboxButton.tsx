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

  // ✅ UI-only: 회원 편지함 mock data
  const [mockLetters, setMockLetters] = useState<Letter[]>([
    {
      id: 'l1',
      from: '수빈',
      content: '메리 크리스마스! 올해도 행복하자 🎄',
      createdAt: '2025-11-20',
    },
  ]);

  useEffect(() => {
    if (!isLoaded) loadUser();
  }, [isLoaded, loadUser]);

  // 내 트리 판별: loginId === slug
  const isMyTree = !!user && user.loginId === slug;

  const handleClickAction = () => {
    if (isMyTree) setOpenRead(true);
    else setOpenWrite(true);
  };

  // ✅ UI-only: 비회원 편지 저장 로직
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
      <button
        type="button"
        onClick={handleClickAction}
        aria-label={isMyTree ? 'open-mailbox' : 'write-letter'}
        className="
          absolute right-0 top-[56px] pr-2 z-20
          transition-transform active:scale-95
          flex items-center justify-center
        "
      >
        {isMyTree ? (
          // ✅ 회원: 우체통 이미지 그대로
          <Image src="/images/Mailbox_v02.png" alt="mailbox" width={75} height={75} priority />
        ) : (
          // ✅ 비회원: 업로드한 편지봉투 PNG 사용
          <span
            className="text-[44px] leading-none select-none"
            style={{
              transform: 'translateY(12px)',
              textShadow: '0 0 3px rgba(0,0,0,0.4)',
            }}
          >
            ✉️
          </span>
        )}
      </button>

      {/* ✅ 회원: 편지함 읽기 모달 */}
      {isMyTree && <LettersModal open={openRead} onCloseAction={() => setOpenRead(false)} letters={mockLetters} />}

      {/* ✅ 비회원: 편지 쓰기 모달 */}
      {!isMyTree && <LetterWriteModal open={openWrite} onCloseAction={() => setOpenWrite(false)} onSubmitAction={handleSubmitLetterAction} />}
    </>
  );
}
