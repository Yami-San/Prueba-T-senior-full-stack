import { useSession } from 'next-auth/react';
import Home from '@/components/ui/templates/home';

export default function HomePage() {
  const { data: session } = useSession();
  return (
    <Home></Home>
  );
}
