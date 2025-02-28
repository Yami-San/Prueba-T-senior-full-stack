import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import TransactionsChartUI from '@/components/ui/templates/transactions-chart';

export default function TransactionsChartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status !== "loading" && (!session || session.user.role !== "ADMIN")) {
      router.replace("/"); // Redirige al home si no es ADMIN
    }
  }, [session, status, router]);

  if (status === "loading" || !session || session.user.role !== "ADMIN") {
    return <p>Cargando...</p>;
  }

  return (
    <TransactionsChartUI></TransactionsChartUI>
  );
}
