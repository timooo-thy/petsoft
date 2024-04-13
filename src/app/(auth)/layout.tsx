import Icon from "@/components/icon";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-dvh flex-col gap-y-5">
      <Icon />
      {children}
      <Toaster richColors />
    </div>
  );
}
