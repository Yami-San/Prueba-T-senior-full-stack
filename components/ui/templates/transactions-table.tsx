import { Layout } from '@/components/Layout';
import { TransactionsTable } from '@/components/ui/transactions-table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

export default function Userstransactions() {
  const router = useRouter();

  return (
    <Layout>
      <div className='w-2/4 mx-auto p-6 bg-gray-100 rounded-lg shadow-md'>
        <h1 className='text-xl font-bold text-center mb-4'>
          Sistema de gestión de Ingresos y Gastos
        </h1>
        <h2 className='text-lg font-semibold border-b mb-2 text-center'>
          Movimientos
        </h2>
        <div className='flex justify-end mb-4'>
          <Button
            className='px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 hover:scale-110'
            onClick={() => router.push('/new-transaction')}
          >
            Nueva transacción
          </Button>
        </div>
        <TransactionsTable></TransactionsTable>
      </div>
    </Layout>
  );
}