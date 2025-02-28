import { Layout } from '@/components/Layout';
import { TransactionsTable } from '@/components/ui/transactions-table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import Userstransactions from '@/components/ui/templates/transactions-table';

export default function UserstransactionsPage() {
  const router = useRouter();

  return (
    <Userstransactions></Userstransactions>
  );
}
