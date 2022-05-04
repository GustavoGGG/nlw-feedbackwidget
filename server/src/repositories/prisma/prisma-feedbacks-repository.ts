import { prisma } from "../../prisma";
import { FeedbacksCreateDTO } from "../dtos/feedbacksCreateDTO";
import { FeedbacksRepository } from "../protocols/feedbacks-repository";

class PrismaFeedbacksRepository implements FeedbacksRepository {

  async create({ type, comment, screenshot }: FeedbacksCreateDTO): Promise<void> {
    const feedback = await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    })
  }

}

export { PrismaFeedbacksRepository }