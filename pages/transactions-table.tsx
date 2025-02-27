import { Layout } from "@/components/Layout";
import { TransactionsTable } from "@/components/ui/transactions-table";
import { Button } from "@/components/ui/button";

export default function Userstransactions() {
  
    return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-center mb-4">
          Sistema de gestión de Ingresos y Gastos
        </h1>
        <h2 className="text-lg font-semibold border-b mb-2 text-center">Gestión de suarios</h2>
        <Button className="mb-4 px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 hover:scale-110 ">Nuevo</Button>
        <TransactionsTable></TransactionsTable>
        </div>
      </Layout>
    );
  }