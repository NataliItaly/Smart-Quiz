import { Category } from "../pages/quiz/quiz.types";
import { Level } from "../pages/quiz/quiz.types";

export interface QuizAttempt {
  id: string;
  date: string;
  userId: string;
  score: number;
  total: number;
  category: Category;
  level: Level;
  percentage: number;
}

class StatisticsService {
    private storageKey = 'quiz_attempts';

    //saved attempts

    saveAttempt(attempt: Omit<QuizAttempt, 'id' | 'date' | 'percentage'>): QuizAttempt {
        const attempts = this.getAllAttempts();
        const percentage = (attempt.score / attempt.total) * 100;

        const newAttempt: QuizAttempt = {
            ...attempt,
            id: Date.now().toString(),
            date: new Date().toISOString(),
            percentage: Number(percentage.toFixed(2))
        };

        attempts.push(newAttempt);
        localStorage.setItem(this.storageKey, JSON.stringify(attempts));
        return newAttempt;
    }

    //all attempts of all users

    getAllAttempts(): QuizAttempt[] {
        const data = localStorage.getItem(this.storageKey);
        if (!data) return [];

        try {
            const parsed = JSON.parse(data) as QuizAttempt[];
            return parsed;
        } catch {
            console.error('faild to parse');
            return [];
        }
    }

    //attempts from unique user

    getUserAttempts(userId: string): QuizAttempt[] {
        const allAttempts = this.getAllAttempts();
        return allAttempts.filter(attempt => attempt.userId === userId);
    }

    //last N attempts 

    getLastAttempts(userId: string, limit: number = 5): QuizAttempt[] {
        const userAttempts = this.getUserAttempts(userId);
        return userAttempts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
    }

    //find the best attempt

    getBestAttempt(userId: string): QuizAttempt | null {
        const userAttempts = this.getUserAttempts(userId);
        if (userAttempts.length === 0) return null;
        return userAttempts.reduce((best, current) =>
            current.percentage > best.percentage ? current : best);
    }

    //% of right attempts from all 

    getOverallPercentage(userId: string): number {
        const userAttempts = this.getUserAttempts(userId);
        if (userAttempts.length === 0) return 0;

        const totalScore = userAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
        const totalQuestions = userAttempts.reduce((sum, attempt) => sum + attempt.total, 0);

        if (totalQuestions === 0) return 0;
        return Number(((totalScore / totalQuestions) * 100).toFixed(2));
    }

    //stats for user

    getUserStats(userId: string) {
        const attempts = this.getUserAttempts(userId);
        const totalAttempts = attempts.length;
        const overallPercentage = this.getOverallPercentage(userId);
        const bestAttempt = this.getBestAttempt(userId);
        const lastAttempts = this.getLastAttempts(userId, 5);

        return {
            totalAttempts,
            overallPercentage,
            bestAttempt,
            lastAttempts
        };
    }

    //clear history (just for testing)

    clearAllHistory(): void {
        localStorage.removeItem(this.storageKey);
        console.log('all quiz history cleared');
    }
}

export const statisticsService = new StatisticsService();