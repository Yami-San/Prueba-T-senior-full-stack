// __tests__/Home.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/pages/index'; // Ajusta la ruta según la ubicación de tu HomePage

// Hacemos mock de Home para devolver un componente sencillo con un data-testid
jest.mock('@/components/ui/templates/home', () => () => (
  <div data-testid="home-component">Home Component</div>
));

describe('HomePage', () => {
  it('debería renderizar el componente Home', () => {
    render(<HomePage />);
    // Verifica que el componente Home se renderice mediante el data-testid
    expect(screen.getByTestId('home-component')).toBeInTheDocument();
    // También verifica que se muestre el texto del componente mockeado
    expect(screen.getByText('Home Component')).toBeInTheDocument();
  });
});
