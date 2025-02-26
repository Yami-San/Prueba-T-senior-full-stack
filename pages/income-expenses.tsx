import { useState } from "react";
import { DataTableDemo } from "@/components/ui/transactions-table";
import { Layout } from "@/components/Layout";

export default function IncomeExpenseTable() {
    const [transactions, setTransactions] = useState([
      { id: 1, concept: "Salario", amount: 1000, date: "2025-02-24", user: "Admin" },
    ]);
  
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  
    return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-center mb-4">
          Sistema de gestión de Ingresos y Gastos
        </h1>
        <h2 className="text-lg font-semibold border-b mb-2">Ingresos y egresos</h2>
        <button className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Nuevo</button>
        <DataTableDemo></DataTableDemo>
        <div className="mt-4 p-2 bg-gray-300 text-right font-semibold">
          Total: ${totalAmount}
        </div>
      </div>
      </Layout>
    );
  }