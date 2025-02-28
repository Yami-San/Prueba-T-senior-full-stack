import { Layout } from "@/components/Layout";
import { UserTable } from "@/components/ui/userTable";

export default function UsersTableComponent() {
    return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 data-testid="only-admin" className="text-xl font-bold text-center mb-4">
          Sistema de gestión de Ingresos y Gastos
        </h1>
        <h2 className="text-lg font-semibold border-b mb-2 text-center">Gestión de usuarios</h2>
        <UserTable></UserTable>
        </div>
      </Layout>
    );
  }