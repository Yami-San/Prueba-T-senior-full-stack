import { Layout } from '@/components/Layout';
import { useRouter } from 'next/router';
import { EditUser } from '@/components/ui/form-edit-user';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function TransactionsChartUI() {
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
  const { id } = router.query; // Obtiene el id de la URL

  if (!id) return <p>Cargando...</p>;
  return (
    <Layout>
      <div className='max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md'>
        <h1 className='text-xl font-bold text-center mb-4'>
          Sistema de gestión de Ingresos y Gastos
        </h1>
        <EditUser userId={id as string}></EditUser>
      </div>
    </Layout>
  );
}