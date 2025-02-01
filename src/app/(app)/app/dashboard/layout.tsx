import DropdownSalon from "@/components/DropdownSalon";
import ThemeButton from "@/components/ThemeButton";
import UserDropDownMenu from "@/components/UserDropDownMenu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b lg:h-[60px]">
            <DropdownSalon />
            {/* <SalonLogo v-else /> */}
          </div>
          <div className="flex-1">{/* <Nav :links="navLinks" /> */}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {/* <MobileNav :links="navLinks" /> */}
          <div className="flex justify-end w-full gap-4">
            <ThemeButton />
            <UserDropDownMenu />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
