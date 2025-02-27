import Head from "next/head";
import { Layout } from "@/components/Layout";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function UpdateUser() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Edit User</title>
      </Head>
      <Layout>
        {session ? (
          <main className="flex-1 flex justify-center items-center p-0">
            <div className="flex flex-col justify-center items-center h-[80vh] w-11/12 max-w-lg bg-[radial-gradient(circle_at_center,_rgba(222,196,217,0.1),_rgba(68,79,217,0.1))] rounded-full p-8">
              <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                <form className="flex flex-col gap-6">
                  <div className="flex flex-col">
                    <Label className="p-3" htmlFor="name">Nombre</Label>
                    <Input id="name" placeholder="Nombre" />
                  </div>
                  <div className="flex flex-col">
                    <Label className="p-3" htmlFor="role">Rol</Label>
                    <Input id="role" placeholder="Rol" />
                  </div>
                  <Button type="submit">Guardar</Button>
                </form>
              </div>
            </div>
          </main>
        ) : (
          <p>No hay sesión activa</p>
        )}
      </Layout>
    </>
  );
}
