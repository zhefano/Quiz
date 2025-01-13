import { Component, ViewChild } from '@angular/core';
import { QuizComponentComponent } from '../../components/quiz-component/quiz-component.component';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz';
import { PlayerService } from '../../services/player.service';
import { LeaderboardService } from '../../services/leaderboard.service';

@Component({
  selector: 'app-play-quiz-page',
  imports: [QuizComponentComponent],
  templateUrl: './play-quiz-page.component.html',
  styleUrl: './play-quiz-page.component.css',
})
export class PlayQuizPageComponent {
  private quizService: QuizService;
  private playerService: PlayerService;
  private leaderboardService: LeaderboardService;
  @ViewChild(QuizComponentComponent) quizComponent!: QuizComponentComponent; // Hämta referens

  constructor(
    quizService: QuizService,
    playerService: PlayerService,
    leaderboardService: LeaderboardService
  ) {
    this.quizService = quizService;
    this.playerService = playerService;
    this.leaderboardService = leaderboardService;
  }

  get quizQuestions(): Quiz[] {
    return this.quizService.quiz;
  }

  currentQuizIndex = 0;
  correctAnswersCount = 0;

  // Hämta det aktuella quizet
  get currentQuiz() {
    return this.quizQuestions[this.currentQuizIndex];
  }

  // Navigera till nästa quiz
  nextQuiz() {
    if (this.currentQuizIndex < this.quizQuestions.length - 1) {
      this.currentQuizIndex++;
      this.quizComponent.resetFeedbackMessage(); // Nollställ feedbacken
    }
  }

  // Navigera till föregående quiz
  previousQuiz() {
    if (this.currentQuizIndex > 0) {
      this.currentQuizIndex--;
      this.quizComponent.resetFeedbackMessage(); // Nollställ feedbacken
    }
  }
  incrementCorrectAnswers(): void {
    this.correctAnswersCount++;
  }

  /* En metod som avslutar quizet och sparar spelarens Poäng
  hämtar den aktuella spelaren från localStorage
  lägger till poängen spelaren fått via leaderboardService
  loggar sedaan en bekräftelse på att koden funkar */

  finishQuiz(): void {
    const player = this.playerService.getPlayerFromLocalStorage();
    if (player) {
      const playerName = player.username;
      this.leaderboardService.addScore(playerName, this.correctAnswersCount);
      console.log(
        `Poäng sparad för spelare: ${playerName}, Poäng: ${this.correctAnswersCount}`
      );
    } else {
      console.warn('Ingen spelare hittades i localStorage.');
    }
  }
}
