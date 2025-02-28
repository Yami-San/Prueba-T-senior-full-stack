// __tests__/UserTable.test.tsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { UserTable } from '@/components/ui/userTable'; // Ajusta la ruta según tu estructura
import { useQuery } from '@apollo/client';

// Se hace mock de useQuery para simular los estados de la consulta
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

describe('UserTable', () => {
  const dummyUsers = [
    { id: '1', name: 'Alice', email: 'alice@example.com', phone_number: '12345', role: 'ADMIN' },
    { id: '2', name: 'Bob', email: 'bob@example.com', phone_number: '', role: 'USER' },
  ];

  it('muestra el estado de carga', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
      error: undefined,
    });
    render(<UserTable />);
    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();
  });

  it('muestra el estado de error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      loading: false,
      error: { message: 'Test error' },
    });
    render(<UserTable />);
    expect(screen.getByText(/Error: Test error/i)).toBeInTheDocument();
  });

  it('muestra la tabla con los datos de usuarios', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { users: dummyUsers },
      loading: false,
      error: undefined,
    });
    render(<UserTable />);
    
    // Verifica que se muestren los encabezados de la tabla
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Correo')).toBeInTheDocument();
    expect(screen.getByText('Teléfono')).toBeInTheDocument();
    expect(screen.getByText('Editar')).toBeInTheDocument();

    // Verifica que se muestren los datos de al menos un usuario
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    });
  });

  it('filtra los usuarios según el input', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { users: dummyUsers },
      loading: false,
      error: undefined,
    });
    render(<UserTable />);
    
    // Se obtiene el input de filtrado por nombre
    const input = screen.getByPlaceholderText('Filtrar por nombre...') as HTMLInputElement;
    
    // Verifica que inicialmente se muestran ambos usuarios
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    // Simula escribir "Alice" en el input
    fireEvent.change(input, { target: { value: 'Alice' } });

    // Ahora solo debería mostrarse Alice y no Bob
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.queryByText('Bob')).toBeNull();
    });
  });
});
