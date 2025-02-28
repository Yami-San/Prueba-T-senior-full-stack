// __tests__/NewTransactionForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NewTransactionForm } from '@/components/ui/form-transaction';
import { useMutation } from '@apollo/client';

// Se hace mock de useMutation para simular la mutación
jest.mock('@apollo/client', () => {
  const originalModule = jest.requireActual('@apollo/client');
  return {
    ...originalModule,
    useMutation: jest.fn(),
  };
});

describe('NewTransactionForm', () => {
  const createTransactionMock = jest.fn();

  beforeEach(() => {
    createTransactionMock.mockReset();
    // Simulamos que useMutation retorna un array: [función de mutación, objeto de estado]
    (useMutation as jest.Mock).mockReturnValue([
      createTransactionMock,
      { loading: false, error: null },
    ]);
  });

  it('envía el formulario correctamente y resetea los campos', async () => {
    render(<NewTransactionForm />);

    // Se obtienen los inputs por sus labels
    const amountInput = screen.getByLabelText(/Monto/i);
    const descriptionInput = screen.getByLabelText(/Concepto/i);
    const dateInput = screen.getByLabelText(/Fecha/i);
    const submitButton = screen.getByRole('button', { name: /Guardar Movimiento/i });

    // Se completan los campos con valores válidos
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.change(descriptionInput, { target: { value: 'Transacción de prueba' } });
    // Se proporciona una fecha válida; en este test no se verifica que la fecha no esté vacía
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });

    // Se envía el formulario
    fireEvent.click(submitButton);

    // Se espera que se llame a la mutación
    await waitFor(() => {
      expect(createTransactionMock).toHaveBeenCalled();
    });

    // Se verifica que se llamó a la mutación con las variables correctas
    const expectedDate = new Date('2023-01-01').toISOString();
    expect(createTransactionMock).toHaveBeenCalledWith({
      variables: {
        amount: 100,
        description: 'Transacción de prueba',
        date: expectedDate,
      },
    });

    // Verificamos que los campos se hayan reseteado después del envío
    expect(amountInput).toHaveValue(0);
    expect(descriptionInput).toHaveValue('');
    expect(dateInput).toHaveValue('');
  });

  it('muestra error si el monto es menor o igual a 0', async () => {
    render(<NewTransactionForm />);

    const amountInput = screen.getByLabelText(/Monto/i);
    const descriptionInput = screen.getByLabelText(/Concepto/i);
    const dateInput = screen.getByLabelText(/Fecha/i);
    const submitButton = screen.getByRole('button', { name: /Guardar Movimiento/i });

    // Se ingresa un monto inválido
    fireEvent.change(amountInput, { target: { value: '0' } });
    fireEvent.change(descriptionInput, { target: { value: 'Transacción de prueba' } });
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/El monto debe ser mayor que 0/i)).toBeInTheDocument();
    });

    expect(createTransactionMock).not.toHaveBeenCalled();
  });

  it('muestra error si el concepto (descripción) está vacío', async () => {
    render(<NewTransactionForm />);

    const amountInput = screen.getByLabelText(/Monto/i);
    const descriptionInput = screen.getByLabelText(/Concepto/i);
    const dateInput = screen.getByLabelText(/Fecha/i);
    const submitButton = screen.getByRole('button', { name: /Guardar Movimiento/i });

    fireEvent.change(amountInput, { target: { value: '100' } });
    // Se ingresa un valor vacío para la descripción
    fireEvent.change(descriptionInput, { target: { value: ' ' } });
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/El concepto es obligatorio/i)).toBeInTheDocument();
    });

    expect(createTransactionMock).not.toHaveBeenCalled();
  });
});
