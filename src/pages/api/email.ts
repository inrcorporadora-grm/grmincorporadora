import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.TRANSPORTER_MAIL,
      pass: process.env.TRANSPORTER_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: req.body.email,
    to: process.env.GRM_MAIL,
    replyTo: req.body.email,
    subject: `Contato através do website: ${process.env.NEXT_PUBLIC_HOST}`,
    text: req.body.message,
    html: req.body.message,
  });

  res.send(info);
}
