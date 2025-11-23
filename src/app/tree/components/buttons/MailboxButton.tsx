// src/app/tree/components/buttons/MailboxButton.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/src/stores/useAuthStore';
import Image from 'next/image';

import LettersModal from '../modals/LettersModal';
import LetterWriteModal from '../modals/LetterWriteModal';
import { getLettersApi } from '@/src/api/letters';

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

  // 실제 API에서 받아온 편지 목록
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isLettersLoading, setIsLettersLoading] = useState(false);

  // 로그인 정보 로딩
  useEffect(() => {
    if (!isLoaded) loadUser();
  }, [isLoaded, loadUser]);

  // 내가 내 트리를 보고 있는지
  const isMyTree = !!user && user.loginId === slug;

  /**
   * 내 트리일 때만 편지 목록 조회
   * 쿠키 기반 API라 프론트는 userId/slug 전달하지 않음
   */
  useEffect(() => {
    if (!isMyTree) return;

    const fetchLetters = async () => {
      try {
        setIsLettersLoading(true);

        const res = await getLettersApi(); // 쿠키 기반 내 편지 조회
        const mapped: Letter[] = (res.letters ?? []).map((l) => ({
          id: l.letter_id,
          from: l.sender_name,
          content: l.content,
          createdAt: l.created_at.split('T')[0],
        }));

        setLetters(mapped);
      } catch {
        setLetters([]);
      } finally {
        setIsLettersLoading(false);
      }
    };

    fetchLetters();
  }, [isMyTree]);

  // 클릭 시
  const handleClickAction = () => {
    if (isMyTree) setOpenRead(true);
    else setOpenWrite(true);
  };

  /**
   * 비회원 편지 쓰기 UI-only 저장
   * (나중에 POST /api/letters 붙일 예정)
   */
  const handleSubmitLetterAction = (payload: Omit<Letter, 'id'>) => {
    const newLetter: Letter = {
      id: `l-${Date.now()}`,
      ...payload,
    };
    setLetters((prev) => [newLetter, ...prev]);
    alert('편지가 저장되었습니다! (UI-only)');
  };

  return (
    <>
      {/* 우체통 아이콘 */}
      <button type="button" onClick={handleClickAction} aria-label="mailbox" className="transition-transform active:scale-95">
        <Image src="/images/Mailbox_v02.png" alt="mailbox" width={75} height={75} priority />
      </button>

      {/* 내 트리 → 편지함 읽기 */}
      {isMyTree && <LettersModal open={openRead} onCloseAction={() => setOpenRead(false)} letters={letters} />}

      {/* 비회원 → 편지 작성 */}
      {!isMyTree && <LetterWriteModal open={openWrite} onCloseAction={() => setOpenWrite(false)} onSubmitAction={handleSubmitLetterAction} />}
    </>
  );
}
