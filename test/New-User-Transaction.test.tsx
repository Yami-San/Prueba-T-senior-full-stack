// __tests__/NewUserTransactionForm.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NewUserTransactionForm from '@/pages/new-transaction';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// Mocks para los hooks de Next Auth y Next Router
jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock para el componente NewUserTransaction
jest.mock('@/components/ui/templates/form-transaction', () => () => (
  <div data-testid="new-user-transaction">New User Transaction Form</div>
));

describe('NewUserTransactionForm', () => {
  it('redirige a la home si el usuario no es ADMIN', async () => {
    // Simula una sesión donde el usuario no es administrador
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: 'USER' } },
      status: 'authenticated',
    });
    const replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
      query: {},
    });

    render(<NewUserTransactionForm />);
    
    // Se espera que se invoque la redirección a "/" y se muestre el fallback "Cargando..."
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('/');
    });
    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();
  });

  it('muestra el formulario si el usuario es ADMIN', async () => {
    // Simula una sesión de usuario administrador
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: 'ADMIN' } },
      status: 'authenticated',
    });
    const replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
      query: {},
    });

    render(<NewUserTransactionForm />);
    
    // Espera a que se renderice el componente NewUserTransaction (mockeado)
    await waitFor(() => {
      expect(screen.getByTestId('new-user-transaction')).toBeInTheDocument();
    });
    // Verifica que no se llame a la función de redirección
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
