import nodemailer from 'nodemailer';

// Create transporter using Gmail App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Generate random OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
export const sendOTPEmail = async (
  email: string,
  otp: string,
  name: string = 'User'
): Promise<boolean> => {
  try {
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: 'MS Brand Store - Your OTP Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FFD600 0%, #FF6B35 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">MS Brand Store</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="color: #475569; font-size: 16px; margin-bottom: 20px;">
              Hello <strong>${name}</strong>,
            </p>
            
            <p style="color: #475569; font-size: 14px; margin-bottom: 20px;">
              Your OTP verification code is:
            </p>
            
            <div style="background: white; border: 2px solid #FFD600; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 32px; font-weight: bold; color: #000000; letter-spacing: 5px;">
                ${otp}
              </p>
            </div>
            
            <p style="color: #94A3B8; font-size: 13px; margin-bottom: 20px;">
              This code expires in <strong>10 minutes</strong>
            </p>
            
            <p style="color: #475569; font-size: 14px; margin-bottom: 20px;">
              If you didn't request this code, please ignore this email. Your account is safe.
            </p>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 20px;">
              <p style="color: #94A3B8; font-size: 12px; margin: 0;">
                © 2026 MS Brand Store. All rights reserved.<br>
                <a href="https://msbrandstore.com" style="color: #FF6B35; text-decoration: none;">Visit our website</a>
              </p>
            </div>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('OTP email sent:', result.messageId);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

// Send order confirmation email
export const sendOrderConfirmationEmail = async (
  email: string,
  orderData: {
    orderId: string;
    customerName: string;
    items: any[];
    total: number;
    address: string;
    estimatedDelivery: string;
  }
): Promise<boolean> => {
  try {
    const itemsHTML = orderData.items
      .map(
        (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${item.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">x${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">Rs. ${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `
      )
      .join('');

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: `Order Confirmation - ${orderData.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FFD600 0%, #FF6B35 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Order Confirmed!</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="color: #475569; font-size: 16px; margin-bottom: 20px;">
              Thank you, <strong>${orderData.customerName}</strong>!
            </p>
            
            <p style="color: #475569; font-size: 14px; margin-bottom: 20px;">
              Your order has been confirmed. Here are the details:
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0;"><strong>Order ID:</strong> ${orderData.orderId}</p>
              <p style="margin: 0 0 10px 0;"><strong>Delivery Address:</strong></p>
              <p style="margin: 0 0 10px 0 0; color: #94A3B8;">${orderData.address}</p>
              <p style="margin: 0 0 0 0;"><strong>Estimated Delivery:</strong> ${orderData.estimatedDelivery}</p>
            </div>
            
            <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse;">
              <thead>
                <tr style="background: #FFD600;">
                  <th style="padding: 10px; text-align: left; color: #000000;">Product</th>
                  <th style="padding: 10px; text-align: right; color: #000000;">Qty</th>
                  <th style="padding: 10px; text-align: right; color: #000000;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>
            
            <div style="background: #FFD600; padding: 15px; border-radius: 8px; text-align: right; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #000000;">
                Total: Rs. ${orderData.total.toFixed(2)}
              </p>
            </div>
            
            <p style="color: #475569; font-size: 14px; margin-bottom: 20px;">
              Payment Method: <strong>Cash on Delivery</strong>
            </p>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 20px;">
              <p style="color: #94A3B8; font-size: 12px; margin: 0;">
                © 2026 MS Brand Store. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent:', result.messageId);
    return true;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};

// Test transporter
export const testEmailConnection = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log('Email connection verified successfully');
    return true;
  } catch (error) {
    console.error('Email connection error:', error);
    return false;
  }
};
