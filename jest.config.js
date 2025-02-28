const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Dir donde se encuentra tu aplicación Next.js
  dir: './',
});

const customJestConfig = {
  // Se cargará este archivo después de iniciar el entorno de test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // Usa el entorno jsdom para simular un navegador
  testEnvironment: 'jest-environment-jsdom',
  // Puedes agregar otras configuraciones personalizadas aquí si lo requieres
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Mapea @ a la raíz del proyecto
  },
};

module.exports = createJestConfig(customJestConfig);
