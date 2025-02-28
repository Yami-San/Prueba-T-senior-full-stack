// __tests__/UsersTablePage.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UsersTablePage from '@/pages/users-table';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// Mocks para los hooks de Next Auth y Next Router
jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock para el componente que se renderiza cuando el usuario es ADMIN
jest.mock('@/components/ui/templates/users-table', () => () => (
  <div data-testid="users-table">Users Table</div>
));

describe('UsersTablePage', () => {
  it('redirige a la home si el usuario no es ADMIN', async () => {
    // Simula una sesión donde el usuario no es administrador
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: 'USER' } },
      status: 'authenticated',
    });
    // Simula el router
    const replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
      query: {},
    });

    render(<UsersTablePage />);

    // Espera a que se llame a la función de redirección
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('/');
    });
    // También se verifica que se muestre el fallback "Cargando..."
    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();
  });

  it('muestra UsersTableComponent si el usuario es ADMIN', async () => {
    // Simula una sesión con un usuario ADMIN
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: 'ADMIN' } },
      status: 'authenticated',
    });
    const replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
      query: {},
    });

    render(<UsersTablePage />);

    // Se espera a que se renderice el componente UsersTableComponent
    await waitFor(() => {
      expect(screen.getByTestId('users-table')).toBeInTheDocument();
    });
    // Verifica que no se llamó a la función de redirección
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
