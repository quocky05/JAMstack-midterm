// Vercel Serverless Function: /api/checkout
// Đại diện cho chữ "A" (APIs) trong kiến trúc JAMstack

export default async function handler(req, res) {
  // Bật CORS cho phép gọi từ bất kỳ origin nào
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed. Vui lòng gửi request POST để tạo đơn hàng.',
    });
  }

  try {
    const { customer, items, couponCode } = req.body || {};

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Giỏ hàng không có sản phẩm.' });
    }

    // Server-side Authoritative Validation (Kiểm tra và chốt giá độc lập tại Server)
    const rawSubtotal = items.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );

    let serverDiscountPercent = 0;
    const code = String(couponCode || '').trim().toUpperCase();
    if (code === 'JAMSTACK10') {
      serverDiscountPercent = 10;
    } else if (code === 'MIDTERM50') {
      serverDiscountPercent = 50;
    }

    const serverDiscountAmount = Math.round((rawSubtotal * serverDiscountPercent) / 100);
    const serverVerifiedTotal = rawSubtotal - serverDiscountAmount;
    const orderId = `JAM-${Math.floor(100000 + Math.random() * 900000)}`;

    return res.status(200).json({
      success: true,
      orderId,
      customer: customer || { name: 'Khách hàng Demo' },
      itemsCount: items.length,
      serverVerifiedTotal,
      discountPercent: serverDiscountPercent,
      couponApplied: serverDiscountPercent > 0 ? code : null,
      message: 'Đơn hàng (Mock) đã được Serverless API thẩm định và ghi nhận thành công!',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Lỗi xử lý Serverless Function',
      details: error.message,
    });
  }
}
