import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hawaiianspawn.com',
  integrations: [sitemap()],
  redirects: {
    '/marketplace/mha-manager/docs/add-jobs': '/marketplace/mha-manager/docs/ingest',
    '/marketplace/mha-manager/docs/take-naming': '/marketplace/mha-manager/docs/naming-conventions',
    '/marketplace/mha-manager/docs/claude-skills': '/marketplace/mha-manager/docs/mcp-toolset',
  },
});
