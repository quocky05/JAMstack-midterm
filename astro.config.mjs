import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

function createCheckoutMiddleware() {
  return (req, res, next) => {
    if (req.url === '/api/checkout' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        let parsed = {};
        try {
          parsed = JSON.parse(body);
        } catch (_) {}

        // Server-side Authoritative Validation (Kiểm tra độc lập tại Server)
        const items = Array.isArray(parsed.items) ? parsed.items : [];
        const rawSubtotal = items.reduce(
          (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
          0
        );

        // Server-side Coupon Verification
        let serverDiscountPercent = 0;
        const code = String(parsed.couponCode || '').trim().toUpperCase();
        if (code === 'JAMSTACK10') {
          serverDiscountPercent = 10;
        } else if (code === 'MIDTERM50') {
          serverDiscountPercent = 50;
        }

        const serverDiscountAmount = Math.round((rawSubtotal * serverDiscountPercent) / 100);
        const serverVerifiedTotal = rawSubtotal - serverDiscountAmount;
        const orderId = `JAM-${Math.floor(100000 + Math.random() * 900000)}`;

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        });
        res.end(
          JSON.stringify({
            success: true,
            orderId,
            customer: parsed.customer || { name: 'Nguyễn Văn A' },
            itemsCount: items.length || 1,
            serverVerifiedTotal,
            discountPercent: serverDiscountPercent,
            couponApplied: serverDiscountPercent > 0 ? code : null,
            message: 'Đơn hàng (Mock) đã được Serverless API thẩm định và ghi nhận thành công!',
            timestamp: new Date().toISOString(),
          })
        );
      });
      return;
    }
    if (req.url === '/api/checkout' && req.method === 'OPTIONS') {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      res.end();
      return;
    }
    next();
  };
}

// https://astro.build/config
export default defineConfig({
  output: 'static',
  vite: {
    plugins: [
      {
        name: 'dev-api-checkout-middleware',
        configureServer(server) {
          server.middlewares.use(createCheckoutMiddleware());
        },
        configurePreviewServer(server) {
          server.middlewares.use(createCheckoutMiddleware());
        },
      },
    ],
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true,
    }),
  ],
});
