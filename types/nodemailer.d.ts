// Minimal ambient declaration to satisfy TS on Vercel
declare module 'nodemailer' {
  const nodemailer: any
  export default nodemailer
}

