// __tests__/TransactionsChartPage.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TransactionsChartPage from '@/pages/transactions-chart';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// Mocks para los hooks de next-auth y next/router
jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock para el componente TransactionsChartUI
jest.mock('@/components/ui/templates/transactions-chart', () => () => (
  <div data-testid="transactions-chart-ui">Transactions Chart UI</div>
));

describe('TransactionsChartPage', () => {
  it('redirige a la home si el usuario no es ADMIN', async () => {
    // Simulamos una sesión donde el usuario no es administrador
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: 'USER' } },
      status: 'authenticated',
    });
    const replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
      query: {},
    });

    render(<TransactionsChartPage />);

    // Espera a que se invoque la redirección a "/"
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('/');
    });

    // También verifica que se muestre el fallback "Cargando..."
    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();
  });

  it('muestra TransactionsChartUI si el usuario es ADMIN', async () => {
    // Simulamos una sesión donde el usuario es administrador
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: 'ADMIN' } },
      status: 'authenticated',
    });
    const replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
      query: {},
    });

    render(<TransactionsChartPage />);

    // Espera a que se renderice el componente TransactionsChartUI
    await waitFor(() => {
      expect(screen.getByTestId('transactions-chart-ui')).toBeInTheDocument();
    });
    // Verifica que no se haya llamado a la función de redirección
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
