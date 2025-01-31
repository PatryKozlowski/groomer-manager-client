import ThemeButton from "@/components/ThemeButton";
import { Heart, PawPrint } from "lucide-react";

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

export default function ApplicationLayout({
  children,
}: ApplicationLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 fixed top-0 left-0 w-full z-50">
        <div className="flex justify-end w-full gap-4">
          <ThemeButton />
          {/* <UserButton v-if="authStore.isAuthenticated" /> */}
        </div>
      </header>
      <main className="flex flex-1 flex-col justify-center items-center w-full pt-14 lg:pt-[60px] pb-14 lg:pb-[60px]">
        {children}
      </main>
      <footer className="flex h-14 items-center gap-4 border-t bg-muted/40 px-4 lg:h-[60px] lg:px-6 fixed bottom-0 left-0 w-full">
        <div className="flex gap-4 w-full justify-center">
          <Heart className="text-red-500" />
          <PawPrint className="text-violet-500" />
        </div>
      </footer>
    </div>
  );
}
