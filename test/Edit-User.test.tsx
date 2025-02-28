// __tests__/EditUserFormPage.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import EditUserFormPage from '@/pages/update-user/[id]'; // Ajusta la ruta según tu estructura
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock del componente EditUserForm
jest.mock('@/components/ui/templates/form-edit-user', () => () => (
  <div data-testid="edit-user-form">Edit User Form</div>
));

describe('EditUserFormPage', () => {
  it('redirige a home si el usuario no es ADMIN', async () => {
    // Simula una sesión con un usuario que no es admin
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: 'USER' } },
      status: 'authenticated',
    });

    const replaceMock = jest.fn();
    // Simula el router con query id
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
      query: { id: '123' },
    });

    render(<EditUserFormPage />);

    // Espera a que se llame a router.replace con "/" para redirigir
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('/');
    });

    // Verifica que se muestra el fallback "Cargando..."
    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();
  });

  it('muestra el formulario si el usuario es ADMIN y se provee un id', async () => {
    // Simula una sesión con un usuario admin
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: 'ADMIN' } },
      status: 'authenticated',
    });

    const replaceMock = jest.fn();
    // Simula el router con query que incluye el id
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
      query: { id: '123' },
    });

    render(<EditUserFormPage />);

    // Espera a que se renderice el componente EditUserForm
    await waitFor(() => {
      expect(screen.getByTestId('edit-user-form')).toBeInTheDocument();
    });
    // Verifica que no se haya llamado a router.replace
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('muestra "Cargando..." si no se provee id en la URL', async () => {
    // Simula una sesión con un usuario admin
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: 'ADMIN' } },
      status: 'authenticated',
    });

    const replaceMock = jest.fn();
    // Simula el router sin el parámetro id en la URL
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
      query: {},
    });

    render(<EditUserFormPage />);

    // Verifica que se muestra "Cargando..." ya que id es undefined
    await waitFor(() => {
      expect(screen.getByText(/Cargando/i)).toBeInTheDocument();
    });
  });
});
