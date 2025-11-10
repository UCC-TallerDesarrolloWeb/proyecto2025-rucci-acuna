/**
 * Configuración de Vite para el proyecto BRÚJULA
 * ----------------------------------------------
 * - Define alias de rutas para facilitar los imports
 * - Habilita el plugin oficial de React
 * - Compatible con estructura modular del proyecto (components, pages, styles, etc.)
 */

import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// Variables para obtener el directorio actual (compatibles con ESM)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Exportación principal de la configuración
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // Alias principal
      '@': path.resolve(__dirname, './src'),

      // Alias secundarios por tipo de recurso
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@data': path.resolve(__dirname, './src/data'),
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  // Configuración adicional opcional (comentada por ahora)
  // server: {
  //   port: 5173,
  //   open: true,
  // },
})
