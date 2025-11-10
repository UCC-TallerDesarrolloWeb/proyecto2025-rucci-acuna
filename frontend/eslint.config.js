/**
 * Configuración de ESLint para el proyecto BRÚJULA
 * ------------------------------------------------
 * - Aplica las reglas recomendadas para JavaScript y React
 * - Incluye soporte para hooks y React Refresh (Vite)
 * - Ignora la carpeta de compilación /dist
 */

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Ignorar carpetas innecesarias para el análisis
  globalIgnores(['dist', 'node_modules']),

  {
    files: ['**/*.{js,jsx}'],

    // Configuraciones base recomendadas
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    rules: {
      // Evitar variables sin usar, salvo constantes globales (ej. MAYÚSCULAS)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // Requerir el uso correcto de los Hooks de React
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Promover código limpio y consistente
      'no-var': 'error',
      'prefer-const': 'warn',
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
    },
  },
])
