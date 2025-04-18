import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/discord/',
    envDir: '../',
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3010',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
        hmr: {
            clientPort: 443,
        },
        allowedHosts: true,
    },
});