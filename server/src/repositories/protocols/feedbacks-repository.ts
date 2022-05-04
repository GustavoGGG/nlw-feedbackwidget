import { FeedbacksCreateDTO } from "../dtos/feedbacksCreateDTO";

export interface FeedbacksRepository {
  create(data: FeedbacksCreateDTO): Promise<void>

}