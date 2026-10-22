import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { executeGeminiNutritionEstimate } from './api/estimate-nutrition.js';

function geminiDevApiPlugin(env) {
  return {
    name: 'gemini-dev-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/estimate-nutrition' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            res.setHeader('Content-Type', 'application/json');
            try {
              const { foodName, quantity, unit, preparation } = JSON.parse(body || '{}');

              if (!foodName || typeof foodName !== 'string' || !foodName.trim()) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Food name is required.' }));
                return;
              }

              const parsedQty = Number(quantity);
              if (!Number.isFinite(parsedQty) || parsedQty <= 0) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Quantity must be a positive number.' }));
                return;
              }

              if (!unit || typeof unit !== 'string' || !unit.trim()) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Unit is required (e.g., g, ml, piece, bowl).' }));
                return;
              }

              const apiKey =
                env.GEMINI_API_KEY ||
                env.VITE_GEMINI_API_KEY ||
                process.env.GEMINI_API_KEY ||
                process.env.VITE_GEMINI_API_KEY;

              if (!apiKey) {
                res.statusCode = 503;
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'GEMINI_API_KEY is not configured. Please add GEMINI_API_KEY to your .env.local file.',
                  })
                );
                return;
              }

              const data = await executeGeminiNutritionEstimate({
                foodName: foodName.trim(),
                quantity: parsedQty,
                unit: unit.trim(),
                preparation: preparation ? String(preparation).trim() : '',
                apiKey,
              });

              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, data }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message || 'Error estimating nutrition.' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), geminiDevApiPlugin(env)],
    server: {
      port: 3000,
      open: false,
    },
  };
});
