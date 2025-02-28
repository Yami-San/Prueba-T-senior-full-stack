import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import EditUserForm from '@/components/ui/templates/form-edit-user';

export default function EditUserFormPage() {
  const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
      if (status !== "loading" && (!session || session.user.role !== "ADMIN")) {
        router.replace("/"); // Redirige al home si no es ADMIN
      }
    }, [session, status, router]);
  
    if (status === "loading" || !session || session.user.role !== "ADMIN") {
      return <p>Cargando...</p>;
    }
  const { id } = router.query; // Obtiene el id de la URL

  if (!id) return <p>Cargando...</p>;
  return (
    <EditUserForm
    userId={id as string}
    ></EditUserForm>
  );
}