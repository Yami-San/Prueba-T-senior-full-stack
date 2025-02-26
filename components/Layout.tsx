import Image from "next/image"
import { ReactNode } from "react"
import { NavButton } from "@/components/ui/navbutton"

import { useSession, signIn, signOut } from "next-auth/react"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { data: session} = useSession()

  return (
    <div className="flex h-screen bg-primary">
      <aside className="w-1/5 bg-gradient-to-b from-red-300 p-4 flex flex-col items-center">
        <Image
          src="/Logo.png"
          alt="Mi Logo"
          width={125}
          height={125}
          className="hover:scale-150 hover:transition-transform"
        />

        <nav className="flex flex-col items-center justify-center w-full h-2/3 space-y-4">
          {session ? (
            <>
              <NavButton>Ingresos y egresos</NavButton>
              <NavButton>Gestión de usuarios</NavButton>
              <NavButton>Reportes</NavButton>
              <button
                onClick={() => signOut({
                  callbackUrl: `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=http://localhost:3000`,
                })}
                className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn("auth0")}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Iniciar Sesión
              </button>
            </>
          )}
        </nav>
      </aside>
      <main className="flex-1 flex justify-center items-center">{children}</main>
    </div>
  )
}

