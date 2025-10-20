module.exports = {
  preset: 'ts-jest',  // Usando o ts-jest para trabalhar com arquivos .ts e .tsx
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', // Transforma TypeScript com Babel
    '^.+\\.jsx?$': 'babel-jest',     // Transforma arquivos JavaScript com Babel
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(some-esm-package|another-esm-package)/)', // Permite transformar pacotes ESM
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // Configura o jest-dom para asserções de DOM
  globals: {
    'import.meta': {
      env: { 
        VITE_API_URL: 'http://localhost:4000' // Mock da variável de ambiente
      },
    },
  },
};