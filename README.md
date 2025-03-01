Despliguie en vercel: https://prueba-t-senior-full-stack.vercel.app

Pasos para usar el aplicativo en local:

Requisitos:
administrador de paquetes Bun (obligatorio)
Node.js 22.x.x

1. Clonar el repositorio 
2. usar bun install para descargar los paquetes.
3. Preparar las variables de entorno:
```DATABASE_URL= ?pgbouncer=true -->usar pgbouncer para evitar problemas cuando se recarga de nuevo
DIRECT_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
AUTH_SECRET=
AUTH_TRUST_HOST= solo en desarrollo true
NEXT_PUBLIC_AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_ISSUER=
NEXTAUTH_URL=
NEXT_PUBLIC_AUTH0_DOMAIN=
```
El database que se usara es Supabase con prisma.
Para el auth usar auth0
 4. Migrar la base de datos o actualizarla usa: bun x prisma migrate dev
 5. Cambiar todas las variables donde tengan https://prueba-t-senior-full-stack.vercel.app por http://localhost:3000 (puedes burcar rapido con ctl + shift + f)
 6. Ejecutar bun run dev o bun dev
 7. Ir a tu navegador con el link: http://localhost:3000
 8. Iniciar sesión y cambiar el rol del usuario desde Supabase a admin para poder usar toda la app, puede crear más usuarios para ver como actua la app.