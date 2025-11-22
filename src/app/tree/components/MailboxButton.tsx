// src/app/tree/components/MailboxButton.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/src/stores/useAuthStore';
import Image from 'next/image';
import LettersModal from './LettersModal';

export default function MailboxButton() {
  const params = useParams();
  const slug = params.slug as string | undefined;

  const { user, isLoaded, loadUser } = useAuthStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded) loadUser();
  }, [isLoaded, loadUser]);

  const isMyTree = !!user && !!slug && user.loginId === slug;

  return (
    <>
      {/* ✅ 위치는 layout이 잡으니까 여기서는 버튼만 */}
      <button type="button" onClick={() => isMyTree && setOpen(true)} className="pointer-events-auto">
        <Image src="/images/Mailbox_v02.png" alt="mailbox" width={75} height={75} priority />
      </button>

      {isMyTree && <LettersModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
