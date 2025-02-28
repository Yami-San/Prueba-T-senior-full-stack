import Head from 'next/head';
import { CenterButton } from '@/components/ui/centerbutton';
import { Layout } from '@/components/Layout';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        {session ? (
          <>
            <main className='flex-1 flex justify-center items-center gap-6 p-0'>
              <div className='flex-full flex justify-center items-center gap-6 p-4 w-full bg-[radial-gradient(circle_at_center,rgba(222,196,217,0.1),rgba(68,79,217,0.1))] rounded-full'>
                <CenterButton href='/transactions-table'>Ingresos y egresos</CenterButton>
                <CenterButton href='/users-table'>Gestión de usuarios</CenterButton>
                <CenterButton href='/transactions-chart'>Reportes</CenterButton>
              </div>
            </main>
          </>
        ) : (
          <></>
        )}
        :
      </Layout>
    </>
  );
}