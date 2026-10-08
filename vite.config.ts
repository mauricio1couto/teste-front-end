/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv, type ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * O servidor do JSON de produtos não envia o header `Access-Control-Allow-Origin`,
 * então o navegador bloqueia um fetch direto a partir do localhost.
 * Em dev/preview, o Vite faz o proxy de `/api/products` para a URL real
 * (requisição servidor → servidor, sem CORS). Em produção, o mesmo rewrite
 * está em `vercel.json` e `public/_redirects` (Netlify).
 */
const PRODUCTS_UPSTREAM =
  'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const upstream = new URL(env.PRODUCTS_UPSTREAM_URL || PRODUCTS_UPSTREAM);

  const proxy: Record<string, ProxyOptions> = {
    '/api/products': {
      target: upstream.origin,
      changeOrigin: true,
      rewrite: () => upstream.pathname,
    },
  };

  return {
    plugins: [react()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    css: {
      modules: { localsConvention: 'camelCaseOnly' },
    },
    // `open`: abre o navegador automaticamente ao iniciar o servidor.
    server: { proxy, open: true },
    preview: { proxy, open: true },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: { modules: { classNameStrategy: 'non-scoped' } },
    },
  };
});
