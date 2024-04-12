import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-dvh flex-col gap-y-5">
      <Image src="/icon.svg" alt="icon" width={31} height={31} />
      {children}
    </div>
  );
}
