import { MailAdapterDTO } from "../dto/mail-adapterDTO"

interface MailAdapter {

  sendMail(data: MailAdapterDTO): Promise<void>
}

export { MailAdapter }