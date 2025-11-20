import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['@repo/test-config/test-setup.ts'],
        exclude: [
            'node_modules/',
            '.next/',
            'e2e/**',
            '**/*.config.ts',
        ],
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                '.next/',
                '**/*.d.ts',
                '**/*.config.ts',
            ],
        },
    },
});
