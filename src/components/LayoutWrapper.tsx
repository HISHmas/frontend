'use client';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen flex justify-center bg-white">
      <main className="w-full max-w-[414px] min-h-screen flex flex-col mx-auto relative">{children}</main>
    </div>
  );
}
