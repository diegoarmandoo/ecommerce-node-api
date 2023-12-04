import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        /* for example, use global to avoid globals imports (describe, test, expect): */
        globals: true,
    },
    resolve: {
        alias: [
            {
                find: "@modules",
                replacement: path.resolve(__dirname, "src/modules"),
            },
            {
                find: "@shared",
                replacement: path.resolve(__dirname, "src/shared"),
            },
            {
                find: "@main",
                replacement: path.resolve(__dirname, "src/main"),
            }
        ]
    }    
})