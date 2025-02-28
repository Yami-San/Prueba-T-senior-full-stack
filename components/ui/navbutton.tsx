import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavButtonProps {
  children: React.ReactNode;
  href: string;
}

export function NavButton({ children, href }: NavButtonProps) {
  return (
    <Link href={href} passHref>
      <Button
        variant="outline"
        className="w-72 p-6 bg-gradient-to-tl from-blue-900 text-white hover:scale-105"
      >
        {children}
      </Button>
    </Link>
  );
}

export default function Navigation() {
  return (
    <nav>
      <NavButton href="/transactions-table">Ingresos y egresos</NavButton>
      <NavButton href="/users-table">Gestión de usuarios</NavButton>
      <NavButton href="/transactions-chart">Reportes</NavButton>
    </nav>
  );
}