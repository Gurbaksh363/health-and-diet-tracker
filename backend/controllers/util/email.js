import nodemailer from "nodemailer";

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// Send verification email
export const sendVerificationEmail = async (email, name, verificationToken) => {
    try {
        const transporter = createTransporter();
        
        const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;
        
        const mailOptions = {
            from: `"FitMind Health Tracker" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your Email - FitMind",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4CAF50;">Welcome to FitMind, ${name}!</h2>
                    <p>Thank you for registering with FitMind Health & Diet Tracker.</p>
                    <p>Please verify your email address by clicking the button below:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationUrl}" 
                           style="background-color: #4CAF50; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                            Verify Email
                        </a>
                    </div>
                    <p>Or copy and paste this link in your browser:</p>
                    <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
                    <p style="color: #999; font-size: 12px; margin-top: 30px;">
                        This link will expire in 24 hours. If you didn't create an account, please ignore this email.
                    </p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, name, resetToken) => {
    try {
        const transporter = createTransporter();
        
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
        
        const mailOptions = {
            from: `"FitMind Health Tracker" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Reset Your Password - FitMind",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #FF5722;">Password Reset Request</h2>
                    <p>Hello ${name},</p>
                    <p>We received a request to reset your password for your FitMind account.</p>
                    <p>Click the button below to reset your password:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" 
                           style="background-color: #FF5722; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                            Reset Password
                        </a>
                    </div>
                    <p>Or copy and paste this link in your browser:</p>
                    <p style="word-break: break-all; color: #666;">${resetUrl}</p>
                    <p style="color: #999; font-size: 12px; margin-top: 30px;">
                        This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
                    </p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error;
    }
};

// Send welcome email after verification
export const sendWelcomeEmail = async (email, name) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: `"FitMind Health Tracker" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Welcome to FitMind!",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4CAF50;">Welcome to FitMind, ${name}! 🎉</h2>
                    <p>Your email has been verified successfully!</p>
                    <p>You're all set to start your health and fitness journey with us.</p>
                    <h3>What's next?</h3>
                    <ul>
                        <li>Set your health goals</li>
                        <li>Log your meals and track nutrition</li>
                        <li>Record your workouts</li>
                        <li>Monitor your progress</li>
                    </ul>
                    <p>If you have any questions, feel free to reach out to our support team.</p>
                    <p style="margin-top: 30px;">Happy tracking!</p>
                    <p><strong>The FitMind Team</strong></p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw error;
    }
};
