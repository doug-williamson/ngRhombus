import { RenderMode, ServerRoute } from '@angular/ssr';

// Configure which routes are SSR'd by the Node server.
// Use RenderMode.Server for dynamic/on-demand SSR.
// Optionally add specific static routes with RenderMode.Prerender.
export const serverRoutes: ServerRoute[] = [
  // Example static routes you may want to prerender at build time:
  { path: '', renderMode: RenderMode.Server },
  { path: 'home', renderMode: RenderMode.Server },
  { path: 'about', renderMode: RenderMode.Server },

  // Dynamic blog detail stays server-rendered on demand (no prerender params needed):
  // { path: 'blog/:id', renderMode: RenderMode.Server },

  // Fallback: SSR all other routes on demand
  { path: '**', renderMode: RenderMode.Server }
];
