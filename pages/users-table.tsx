import { Layout } from "@/components/Layout";
import { UserTable } from "@/components/ui/userTable";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function IncomeExpenseTable() {
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
      <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-center mb-4">
          Sistema de gestión de Ingresos y Gastos
        </h1>
        <h2 className="text-lg font-semibold border-b mb-2 text-center">Gestión de usuarios</h2>
        <UserTable></UserTable>
        </div>
      </Layout>
    );
  }