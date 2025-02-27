import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { gql, useMutation } from "@apollo/client";

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($amount: Float!, $description: String!, $date: DateTime!) {
    createTransaction(amount: $amount, description: $description, date: $date) {
      id
      amount
      description
      date  
    }
  }
`;

export function NewTransactionForm() {
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>(""); // Formato "YYYY-MM-DD"
  const [formError, setFormError] = useState<string>("");

  const [createTransaction, { loading, error }] = useMutation(CREATE_TRANSACTION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Validaciones: 
    if (amount <= 0) {
      setFormError("El monto debe ser mayor que 0");
      return;
    }
    if (!description.trim()) {
      setFormError("El concepto es obligatorio");
      return;
    }
    if (!date) {
      setFormError("La fecha es obligatoria");
      return;
    }

    // Convertir la fecha a formato ISO
    const transactionDate = new Date(date).toISOString();

    try {
      await createTransaction({
        variables: {
          amount,
          description,
          date: transactionDate,
        },
      });
      // Reiniciar campos después de guardar
      setAmount(0);
      setDescription("");
      setDate("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-3/5">
          <h2 className="text-2xl font-bold mb-4 text-center">Nuevo Movimiento</h2>
          {formError && <p className="text-red-500 text-center">{formError}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input para Monto */}
            <div className="flex flex-col">
              <Label htmlFor="amount">Monto</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  step="0.05"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  placeholder="0.00"
                  required
                  className="pr-8"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              </div>
            </div>
            {/* Input para Concepto */}
            <div className="flex flex-col">
              <Label htmlFor="description">Concepto</Label>
              <Input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ingresa el concepto"
                required
              />
            </div>
            {/* Input para Fecha */}
            <div className="flex flex-col">
              <Label htmlFor="date">Fecha</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Movimiento"}
            </Button>
          </form>
          {error && (
            <p className="text-red-500 text-center mt-2">{error.message}</p>
          )}
        </div>
  );
}
