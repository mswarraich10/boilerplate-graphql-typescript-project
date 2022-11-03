import nodemailer from 'nodemailer'

export async function sendMail(email: string, url: string): Promise<void> {
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })

  const info = await transporter.sendMail({
    from: testAccount.user, // sender address
    to: email, // list of receivers
    subject: 'Confrim Your Email', // Subject line
    text: 'Confirm Email', // plain text body
    html: `<a href=${url}>Click on ${url} to confirm your account</a>`, // html body
  })

  console.log('Message sent: %s', info.messageId)

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
