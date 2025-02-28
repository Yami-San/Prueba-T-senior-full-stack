import { Button } from "@/components/ui/button"
import Link from "next/link";

interface CenterButtonProps {
    children: React.ReactNode;
    href: string;
  }

export function CenterButton({ children, href }: CenterButtonProps) {
  return (
    <Link href={href} passHref>
    <Button
        variant="outline"
        className="w-1/4 h-32 rounded-3xl bg-gradient-to-r from-slate-300 via-teal-100 to-gray-500 flex justify-center items-center transition-transform hover:scale-125 hover:bg-gradient-to-b hover:from-primary hover:via-amber-100 text-3xl"
    >
      {children}
    </Button>
    </Link>
  );
}

