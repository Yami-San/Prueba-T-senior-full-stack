// pages/edit-user.tsx
import { useState, useEffect, FormEvent } from "react"
import { useRouter } from "next/router"

export default function EditUserPage() {
  const router = useRouter()
  
  // Por ejemplo, tomamos el ID del usuario por query param "?id=123"
  const userId = router.query.id

  // Estados para el nombre y el rol
  const [name, setName] = useState("")
  const [role, setRole] = useState("")

  // Cargar los datos del usuario al montar el componente
  useEffect(() => {
    if (!userId) return

    // Llamada al API para obtener el usuario
    async function fetchUser() {
      const res = await fetch(`/api/users/${userId}`)
      if (res.ok) {
        const data = await res.json()
        setName(data.name || "")
        setRole(data.role || "")
      }
    }
    fetchUser()
  }, [userId])

  // Manejar el envío del formulario
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    // Llamada al API para actualizar el usuario
    const res = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role }),
    })

    if (res.ok) {
      alert("¡Usuario actualizado correctamente!")
      // Podrías redirigir a otra página, por ejemplo:
      // router.push("/usuarios")
    } else {
      alert("Error al actualizar el usuario")
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h1>Editar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4 }}>
            Nombre:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4 }}>
            Rol:
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%" }}
          />
          {/* O podrías usar un <select> si tienes roles predefinidos */}
        </div>

        <button type="submit" style={{ padding: "8px 16px" }}>
          Guardar cambios
        </button>
      </form>
    </div>
  )
}
