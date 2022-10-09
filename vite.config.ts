import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/stripe-cart-additem.ts',
      formats: ['es']
    }
  }
})
