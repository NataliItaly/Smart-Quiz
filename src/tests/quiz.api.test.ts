import { vi, test, expect, describe, beforeEach } from "vitest";
import { quizService } from "../scripts/services/quiz.service";

describe("API service: quizService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("returns questions when API responds with ok=true", async () => {
    const mockData = {
      quiz: {
        js: {
          easy: [
            { id: 1, question: "2+2?", answer: "4" }
          ]
        }
      }
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    const result = await quizService();

    expect(result).toEqual([
      { id: 1, question: "2+2?", answer: "4", category: "js", level: "easy" }
    ]);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("throws error when API returns ok=false", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false
    });

    await expect(quizService()).rejects.toThrow("Failed to load quiz questions");
  });
});