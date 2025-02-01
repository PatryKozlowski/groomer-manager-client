import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="w-full flex justify-center items-center h-full">
      <Loader2 className="w-8 h-8 mr-2 animate-spin" />
    </div>
  );
}
