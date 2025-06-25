import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración para el despliegue en GitHub Pages
  base: '/dashboard/', // Reemplaza 'nombre-de-tu-repositorio' con el nombre de tu repositorio en GitHub
})
