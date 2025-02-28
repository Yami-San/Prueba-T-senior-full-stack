"use client"; // Si estás en Next.js App Router

import { useQuery, gql } from "@apollo/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      amount
      date
    }
  }
`;

export function TransactionsChart() {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const transactions = data?.transactions ?? [];

  // Transformar datos para el gráfico
  const chartData = transactions.map((tx: { date: string | number | Date; amount: any; }) => ({
    date: new Date(tx.date).toLocaleDateString(),
    amount: tx.amount,
  }));

  // Función para descargar CSV
  const handleDownloadCSV = () => {
    const header = ["Fecha", "Monto"];
    const rows = transactions.map((tx: { date: string | number | Date; amount: any; }) => [
      new Date(tx.date).toLocaleDateString(),
      tx.amount,
    ]);

    const csvContent =
      [header.join(","), ...rows.map((r: any[]) => r.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold text-center">Transacciones por Fecha</h2>

      {/* Gráfica */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="rgb(99, 102, 241)" />
        </BarChart>
      </ResponsiveContainer>

      {/* Botón para descargar CSV */}
      <div className="flex justify-end">
        <Button onClick={handleDownloadCSV}>Descargar CSV</Button>
      </div>
    </div>
  );
}
