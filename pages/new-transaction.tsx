import { Layout } from "@/components/Layout";
import { NewTransactionForm } from "@/components/ui/form-transaction";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function NewUserTransaction() {
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
    <Layout>
      <div className="flex items-center justify-center w-2/5 h-2/3 mx-auto p-0 bg-gray-100 rounded-lg shadow-md justify-items-center">
        <NewTransactionForm></NewTransactionForm>
        </div>
      </Layout>
    );
  }