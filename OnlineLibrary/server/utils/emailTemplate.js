export function generateVerificationOtpEmailTemplate(otpCode){
      return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">Your OTP Code</h2>
      <p style="font-size: 16px; color: #555;">Hi there,</p>
      <p style="font-size: 16px; color: #555;">Use the following One-Time Password (OTP) to proceed:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 28px; font-weight: bold; color: #000; padding: 12px 24px; border-radius: 4px; background-color: #e0e0e0;">
          ${otpCode}
        </span>
      </div>
      <p style="font-size: 16px; color: #777;">This OTP is valid for the next 10 minutes. Do not share it with anyone.</p>
      <p style="font-size: 16px; color: #777;">If you didn't request this OTP, you can safely ignore this email.</p>
      <footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #aaa;">
        <p>Thank you,<br>YourAppName Team</p>
        <p style="font-size: 12px; color: #aaa;">This is an automated email. Please do not reply.</p>
      </footer>
    </div>
  `;
}

export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
      <p style="font-size: 16px; color: #555;">Hi there,</p>
      <p style="font-size: 16px; color: #555;">We received a request to reset your password. Click the button below to proceed:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetPasswordUrl}" style="display: inline-block; font-size: 16px; font-weight: bold; color: #fff; padding: 12px 24px; border-radius: 4px; background-color: #007BFF; text-decoration: none;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 16px; color: #777;">This link will expire in 15 minutes for security reasons.</p>
      <p style="font-size: 16px; color: #777;">If you didn't request a password reset, you can safely ignore this email.</p>
      <footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #aaa;">
        <p>Thank you,<br>YourAppName Team</p>
        <p style="font-size: 12px; color: #aaa;">This is an automated email. Please do not reply.</p>
      </footer>
    </div>
  `;
}
