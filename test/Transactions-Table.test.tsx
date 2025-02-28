// __tests__/UserstransactionsPage.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import UserstransactionsPage from '@/pages/transactions-table'; // Ajusta la ruta según la ubicación real de tu página
import { useRouter } from 'next/router';

// Se mockea useRouter para evitar errores y simular el entorno de Next.js
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Se mockea el componente Userstransactions, que se importa desde '@/components/ui/templates/transactions-table'
jest.mock('@/components/ui/templates/transactions-table', () => () => (
  <div data-testid="userstransactions-component">Userstransactions Component</div>
));

describe('UserstransactionsPage', () => {
  it('debería renderizar el componente Userstransactions', () => {
    // Configuramos el mock de useRouter (aunque en este caso no se usa realmente)
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      pathname: '/userstransactions',
    });

    render(<UserstransactionsPage />);
    
    // Verifica que se renderiza el componente mockeado
    expect(screen.getByTestId('userstransactions-component')).toBeInTheDocument();
  });
});
