import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $name: String, $role: Role) {
    updateUser(id: $id, name: $name, role: $role) {
      id
      name
      role
    }
  }
`;

const userSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  role: z.enum(["USER", "ADMIN"], {
    required_error: "Selecciona un rol válido",
  }),
});

type UserFormValues = z.infer<typeof userSchema>;

export function EditUser({ userId }: { userId: string }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION);

  const onSubmit = async (data: UserFormValues) => {
    await updateUser({ variables: { id: userId, ...data } });
    alert("Usuario actualizado correctamente");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-center">
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" {...register("name")} placeholder="Nombre del usuario" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="role">Rol</Label>
        <Select onValueChange={(value) => setValue("role", value as "USER" | "ADMIN")}> 
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">Usuario</SelectItem>
            <SelectItem value="ADMIN">Administrador</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
      </div>

      <Button className="mx-auto" type="submit" disabled={loading}>
        {loading ? "Actualizando..." : "Actualizar Usuario"}
      </Button>

      {error && <p className="text-red-500 text-sm">Error: {error.message}</p>}
    </form>
  );
}