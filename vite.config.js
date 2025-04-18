import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< Updated upstream
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
=======
    base: "/discord/",
    envDir: './',
    server: {
        proxy: {
        '/api': {
            target: "http://localhost:3010",
            changeOrigin: true,
            secure: false,
            ws: true,
        }
>>>>>>> Stashed changes
        },
        hmr: {
	    protocol: "wss",
            host: "sandboxels.live",
            clientPort: 443,
        },
        allowedHosts: true,
        port: 5173,
        https: false,
        origin: "https://sandboxels.live"
    },
});
