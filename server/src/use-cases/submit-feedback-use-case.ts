import { MailAdapter } from "../adapters/protocols/mail-adapter";
import { FeedbacksRepository } from "../repositories/protocols/feedbacks-repository";
import { SubmitFeedbackDTO } from "./dtos/submit-feedbackDTO";

class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {

  }
  async execute({ type, comment, screenshot }: SubmitFeedbackDTO): Promise<void> {

    if (!type) {
      throw new Error("Type is required.");
    }
    if (!comment) {
      throw new Error("Comment is required.");
    }
    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }
    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })
    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111" >`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`
      ].join('\n')
    })
  }

}

export { SubmitFeedbackUseCase }