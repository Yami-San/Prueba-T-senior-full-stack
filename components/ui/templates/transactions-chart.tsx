import { Layout } from '@/components/Layout';
import { TransactionsChart } from '@/components/ui/transactions-chart';

export default function TransactionsChartUI() {
  return (
    <Layout>
      <div className='max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md'>
        <h1 className='text-xl font-bold text-center mb-4'>
          Sistema de gestión de Ingresos y Gastos
        </h1>
        <TransactionsChart></TransactionsChart>
      </div>
    </Layout>
  );
}