import { Layout } from '@/components/Layout';
import { NewTransactionForm } from '@/components/ui/form-transaction';

export default function NewUserTransaction() {
  return (
    <Layout>
      <div className='flex items-center justify-center w-2/5 h-2/3 mx-auto p-0 bg-gray-100 rounded-lg shadow-md justify-items-center'>
        <h1
          data-testid='only-admin'
          className='absolute h-96 text-xl font-bold text-center mb-4'
          style={{ pointerEvents: 'none' }}
        >
          Sistema de gestión de Ingresos y Gastos
        </h1>
        <NewTransactionForm></NewTransactionForm>
      </div>
    </Layout>
  );
}
