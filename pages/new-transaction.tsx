import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import NewUserTransaction from '@/components/ui/templates/form-transaction';

export default function NewUserTransactionForm() {
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
      <NewUserTransaction></NewUserTransaction>
    );
  }