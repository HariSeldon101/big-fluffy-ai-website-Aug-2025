import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Ensure we run on the Node.js runtime (required for Nodemailer)
export const runtime = 'nodejs'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  company?: string
  subject: string
  message: string
}

export async function POST(req: Request) {
  try {
    const body: ContactFormData = await req.json()
    
    // Validate required fields
    const { firstName, lastName, email, subject, message } = body
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Validate SMTP configuration
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpFrom = process.env.SMTP_FROM || 'Big Fluffy AI <woof@bigfluffy.ai>'
    const smtpTo = process.env.SMTP_TO || 'woof@bigfluffy.ai'

    if (!smtpHost || !smtpPort) {
      console.error('SMTP is not configured:', {
        hasHost: !!smtpHost,
        hasPort: !!smtpPort,
        envKeys: Object.keys(process.env).filter(k => k.startsWith('SMTP_')),
      })
      return NextResponse.json(
        { error: 'Email service not configured. Please contact us directly at woof@bigfluffy.ai' },
        { status: 500 }
      )
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort, 10),
        secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_SECURE === '1' || parseInt(smtpPort, 10) === 465,
        auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
      })

      // Verify connection configuration (optional in production, helpful for errors)
      try {
        await transporter.verify()
      } catch (verifyError) {
        console.warn('SMTP transporter verification failed (continuing):', verifyError)
      }

      // Send notification email to Big Fluffy AI
      await transporter.sendMail({
        from: smtpFrom,
        to: smtpTo,
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #555;">Contact Information</h3>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${body.company ? `<p><strong>Company:</strong> ${body.company}</p>` : ''}
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background: #fff; padding: 20px; border-left: 4px solid #007acc;">
              <h3 style="margin-top: 0; color: #555;">Message</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
              <p>Submitted at: ${new Date().toLocaleString()}</p>
              <p>From: Big Fluffy AI Contact Form</p>
            </div>
          </div>
        `,
      })

      // Send confirmation email to the user (best-effort)
      try {
        await transporter.sendMail({
          from: smtpFrom,
          to: email,
          subject: 'Thank you for contacting Big Fluffy AI',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #007acc; border-bottom: 2px solid #007acc; padding-bottom: 10px;">
                Thank you for reaching out!
              </h2>
              
              <p>Hi ${firstName},</p>
              
              <p>We've received your message and will get back to you within 24 hours during business days.</p>
              
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #555;">Your Message Summary</h3>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap; line-height: 1.6; font-style: italic;">${message}</p>
              </div>
              
              <p>In the meantime, feel free to:</p>
              <ul>
                <li><a href="https://bigfluffy.ai/blog" style="color: #007acc;">Read our latest blog posts</a></li>
                <li><a href="https://bigfluffy.ai/services" style="color: #007acc;">Learn more about our services</a></li>
                <li><a href="https://bigfluffy.ai/book" style="color: #007acc;">Book a 15-minute intro call</a></li>
              </ul>
              
              <p>For urgent matters, feel free to call us directly at <strong>+44 (0) 7727 847722</strong>.</p>
              
              <p>Best regards,<br>
              The Big Fluffy AI Team</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                <p>Big Fluffy AI | London, UK | <a href="mailto:woof@bigfluffy.ai">woof@bigfluffy.ai</a></p>
              </div>
            </div>
          `,
        })
      } catch (confirmationError) {
        console.warn('Failed to send confirmation email:', confirmationError)
      }

    } catch (emailError) {
      console.error('Email service error:', emailError)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again or email us directly at woof@bigfluffy.ai' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email us directly at woof@bigfluffy.ai' },
      { status: 500 }
    )
  }
}
