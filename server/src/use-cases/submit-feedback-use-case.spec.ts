import { SubmitFeedbackDTO } from "./dtos/submit-feedbackDTO"
import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

interface ISut {
  submitFeedback: SubmitFeedbackUseCase
}

const createFeedbackSpy = jest.fn()

const sendMainSpy = jest.fn()

const makeSut = (): ISut => {
  const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMainSpy }
  )
  return { submitFeedback }
}

const makeFakeFeedback = (): SubmitFeedbackDTO => {
  return {
    type: "BUG",
    comment: "any_comment",
    screenshot: "data:image/png;base64:655989886556"
  }
}
describe('Submit Feedback Use Case', () => {

  test('should be able to submit a feedback', async () => {
    const { submitFeedback } = makeSut();
    await expect(submitFeedback.execute(makeFakeFeedback())).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMainSpy).toHaveBeenCalled();
  })

  test('should not be able to submit a feedback without type', async () => {
    const { submitFeedback } = makeSut();
    const feedbackFake = makeFakeFeedback();
    feedbackFake.type = "";
    await expect(submitFeedback.execute(feedbackFake)).rejects.toThrow("Type is required.");
  })

  test('should not be able to submit a feedback without comment', async () => {
    const { submitFeedback } = makeSut();
    const feedbackFake = makeFakeFeedback();
    feedbackFake.comment = "";
    await expect(submitFeedback.execute(feedbackFake)).rejects.toThrow("Comment is required.");
  })

  test('should not be able to submit a feedback with an invalid screenshot', async () => {
    const { submitFeedback } = makeSut();
    const feedbackFake = makeFakeFeedback();
    feedbackFake.screenshot = "fake_screenshot";
    await expect(submitFeedback.execute(feedbackFake)).rejects.toThrow("Invalid screenshot format.");
  })
})
