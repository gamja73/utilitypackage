import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import path from 'path';

export default defineConfig({
    base: './',
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            buffer: 'buffer',
            stream: 'stream-browserify',
        },
    },
    optimizeDeps: {
        include: ['buffer', 'stream-browserify'],
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
});
