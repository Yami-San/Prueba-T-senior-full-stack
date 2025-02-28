import { Layout } from '@/components/Layout';
import { EditUser } from '@/components/ui/form-edit-user';

export default function EditUserForm({ userId }: { userId: string }) {

  if (!userId) return <p>Cargando...</p>;
  return (
    <Layout>
      <div className='max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md'>
        <h1 data-testid="only-admin" className='text-xl font-bold text-center mb-4'>
          Sistema de gestión de Ingresos y Gastos
        </h1>
        <EditUser userId={userId as string}></EditUser>
      </div>
    </Layout>
  );
}
