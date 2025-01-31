import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 text-center">
      <h1 className="text-6xl text-violet-500">Groomer Manager</h1>
      <h2 className="text-4xl">Twój organizer salonu!</h2>
      <div className="mt-4">
        <Link href="/auth">
          <Button>
            <PawPrint />
            Zacznij juz teraz !
          </Button>
        </Link>
      </div>
    </div>
  );
}
