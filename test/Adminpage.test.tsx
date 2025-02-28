import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AdminPage from '@/pages/users-table';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Control de acceso en AdminPage', () => {
  it('redirige a la home si el usuario no es administrador', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: 'USER' } },
      status: 'authenticated',
    });
    const replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
      query: {},
    });

    render(<AdminPage />);
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith('/'));
    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();
  });

  it('muestra la página si el usuario es administrador', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: 'ADMIN' } },
      status: 'authenticated',
    });
    const replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
      query: {},
    });

    render(<AdminPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Sistema de gestión de Ingresos y Gastos/i)).toBeInTheDocument();
    });
    
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
