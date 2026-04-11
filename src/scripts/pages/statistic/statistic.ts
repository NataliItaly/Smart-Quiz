import { Router } from '../../services/router'
import { createElement } from '../../utils/createElement'
import { getUser } from '../../states/userState'
import { statisticsService, QuizAttempt } from '../../services/statisticsService'
import { Category, Level } from '../quiz/quiz.types'

export function renderStatistic(router: Router): void {
  const root = document.getElementById("app")!;
  root.innerHTML = '';
  
  const user = getUser();
  
  // if user exist
  if (!user.id && !user.name) {
    const errorMsg = createElement({ 
      tag: 'div', 
      className: 'statistic-error',
      text: 'Please log in to view statistics' 
    });
    const backBtn = createElement({ tag: 'button', className: 'btn', text: 'Back to Dashboard' });
    backBtn.onclick = () => router.navigate("/dashboard");
    root.append(errorMsg, backBtn);
    return;
  }
  
  // get user stat
  const userStats = statisticsService.getUserStats(user.id);
  const overallPercentage = userStats.overallPercentage;
  const bestAttempt = userStats.bestAttempt;
  const lastAttempts = userStats.lastAttempts;
  const totalAttempts = userStats.totalAttempts;
  
  // create container
  const container = createElement({ tag: 'div', className: 'statistic-container' });
  
  // Header 
  const header = createHeader(router);
  
  // greeting
  const greeting = createGreeting(user.name);
  
  // if there is no attempt 
  if (totalAttempts === 0) {
    const noDataMessage = createElement({ 
      tag: 'div', 
      className: 'stat-no-data',
      text: 'No quiz attempts yet. Start a quiz to see your statistics!' 
    });
    container.append(header, greeting, noDataMessage);
  } else {
    // all stat card
    const overviewCard = createOverviewCard(totalAttempts, overallPercentage);
    
    // best result card
    const bestCard = createBestCard(bestAttempt);
    
    // last attempt card
    const historyCard = createHistoryCard(lastAttempts);
    
    container.append(header, greeting, overviewCard, bestCard, historyCard);
  }
  
  root.appendChild(container);
}

function createHeader(router: Router): HTMLElement {
  const header = createElement({ tag: 'div', className: 'statistic-header' });
  
  const title = createElement({ 
    tag: 'h1', 
    className: 'statistic-title', 
    text: 'My Statistics' 
  });
  
  const backBtn = createElement({ 
    tag: 'button', 
    className: ['btn', 'btn-back'], 
    text: '← Back to Dashboard'
  });
  
  backBtn.onclick = () => router.navigate("/dashboard");
  
  header.append(title, backBtn);
  return header;
}

function createGreeting(userName: string): HTMLElement {
  const name = userName || 'Quiz Master';
  return createElement({ 
    tag: 'div', 
    className: 'stat-greeting',
    text: `Hello, ${name}! Here's your quiz performance` 
  });
}

function createOverviewCard(totalAttempts: number, overallPercentage: number): HTMLElement {
  const card = createElement({ tag: 'div', className: ['stat-card', 'overview-card'] });
  
  const percentageColor = getPercentageColor(overallPercentage);
  
  card.innerHTML = `
    <h2>Overall Performance</h2>
    <div class="stat-big-number">
      <div class="stat-percentage" style="color: ${percentageColor}">
        ${overallPercentage.toFixed(1)}%
      </div>
      <div class="stat-attempts">${totalAttempts} attempt${totalAttempts !== 1 ? 's' : ''}</div>
    </div>
    <div class="stat-progress-bar">
      <div class="stat-progress-fill" style="width: ${overallPercentage}%; background: ${percentageColor}"></div>
    </div>
  `;
  
  return card;
}

function createBestCard(bestAttempt: QuizAttempt | null): HTMLElement {
  const card = createElement({ tag: 'div', className: ['stat-card', 'best-card'] });
  
  if (!bestAttempt) {
    card.innerHTML = `
      <h2>Best Result</h2>
      <p class="stat-no-best">No completed quizzes yet</p>
    `;
    return card;
  }
  
  const percentageColor = getPercentageColor(bestAttempt.percentage);
  
  card.innerHTML = `
    <h2>Best Result</h2>
    <div class="best-result">
      <div class="best-score">${bestAttempt.score}/${bestAttempt.total}</div>
      <div class="best-percentage" style="color: ${percentageColor}">${bestAttempt.percentage.toFixed(1)}%</div>
      <div class="best-details">
        <span class="badge category-badge">${bestAttempt.category}</span>
        <span class="badge level-badge ${bestAttempt.level}">${bestAttempt.level}</span>
      </div>
      <div class="best-date">${formatDate(bestAttempt.date)}</div>
    </div>
  `;
  
  return card;
}

function createHistoryCard(attempts: QuizAttempt[]): HTMLElement {
  const card = createElement({ tag: 'div', className: ['stat-card', 'history-card'] });
  
  if (attempts.length === 0) {
    card.innerHTML = `
      <h2>Recent Attempts</h2>
      <p class="stat-no-history">No attempts yet. Take a quiz to see your history!</p>
    `;
    return card;
  }
  
  let historyHtml = '<h2>Recent Attempts</h2><div class="history-list">';
  
  attempts.forEach((attempt) => {
    const percentageColor = getPercentageColor(attempt.percentage);
    
    historyHtml += `
      <div class="history-item">
        <div class="history-info">
          <div class="history-date">${formatDate(attempt.date)}</div>
          <div class="history-details">
            <span class="badge category-badge">${attempt.category}</span>
            <span class="badge level-badge ${attempt.level}">${attempt.level}</span>
          </div>
        </div>
        <div class="history-score">
          <div class="score-value">${attempt.score}/${attempt.total}</div>
          <div class="score-percentage" style="color: ${percentageColor}">
            ${attempt.percentage.toFixed(1)}%
          </div>
        </div>
      </div>
    `;
  });
  
  historyHtml += '</div>';
  
  if (attempts.length === 5) {
    historyHtml += '<p class="history-note">Showing last 5 attempts</p>';
  }
  
  card.innerHTML = historyHtml;
  return card;
}

function getPercentageColor(percentage: number): string {
  if (percentage >= 80) return '#4caf50';
  if (percentage >= 60) return '#ff9800';
  return '#f44336';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}