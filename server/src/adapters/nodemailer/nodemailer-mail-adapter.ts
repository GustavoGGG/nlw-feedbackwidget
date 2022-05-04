import nodemailer from 'nodemailer'
import { MailAdapterDTO } from "../dto/mail-adapterDTO";
import { MailAdapter } from "../protocols/mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fc48fbf5f6dc5d",
    pass: "e9f999d4db2bf6"
  }
});

class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: MailAdapterDTO): Promise<void> {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Gustavo <gu.gomes.89@gmail.com>',
      subject,
      html: body
    })
  }

}

export { NodemailerMailAdapter }