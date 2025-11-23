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
  createdAt: string; // "YYYY-MM-DD"
}

export default function MailboxButton() {
  const slug = useParams().slug as string;
  const { user, isLoaded, loadUser } = useAuthStore();

  const [openRead, setOpenRead] = useState(false);
  const [openWrite, setOpenWrite] = useState(false);

  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    if (!isLoaded) loadUser();
  }, [isLoaded, loadUser]);

  const isMyTree = !!user && user.loginId === slug;

  /**
   * ✅ 내 트리일 때만 편지 목록 조회
   * - 쿠키 기반이라 getLettersApi()만 호출
   */
  useEffect(() => {
    if (!isMyTree) return;

    const fetchLetters = async () => {
      try {
        const res = await getLettersApi();

        const mapped: Letter[] = (res.letters ?? []).map((l) => ({
          id: l.letter_id,
          from: l.sender_name,
          content: l.content,
          createdAt: l.created_at.split('T')[0],
        }));

        setLetters(mapped);
      } catch {
        setLetters([]);
      }
    };

    fetchLetters();
  }, [isMyTree]);

  const handleClickAction = () => {
    if (isMyTree) setOpenRead(true);
    else setOpenWrite(true);
  };

  const handleSubmitLetterAction = (payload: Omit<Letter, 'id'>) => {
    const newLetter: Letter = {
      id: `l-${Date.now()}`,
      ...payload,
    };
    setLetters((prev) => [newLetter, ...prev]);
  };

  return (
    <>
      {/* 우체통 아이콘 */}
      <button type="button" onClick={handleClickAction} aria-label="mailbox" className="transition-transform active:scale-95">
        <Image src="/images/Mailbox_v02.png" alt="mailbox" width={75} height={75} priority />
      </button>

      {/* ✅ 회원: 편지함 읽기 */}
      {isMyTree && <LettersModal open={openRead} onCloseAction={() => setOpenRead(false)} letters={letters} />}

      {/* ✅ 비회원: 편지 쓰기 */}
      {!isMyTree && (
        <LetterWriteModal open={openWrite} onCloseAction={() => setOpenWrite(false)} receiverSlug={slug} onSubmitAction={handleSubmitLetterAction} />
      )}
    </>
  );
}
