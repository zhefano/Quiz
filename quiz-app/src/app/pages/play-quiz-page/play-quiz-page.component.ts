import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponentComponent } from '../../components/quiz-component/quiz-component.component';
import { QuizService } from '../../services/quiz.service';
import { PlayerService } from '../../services/player.service';
import { LeaderboardService } from '../../services/leaderboard.service';
import { Quiz } from '../../models/quiz';

@Component({
  selector: 'app-play-quiz-page',
  standalone: true,
  imports: [CommonModule, QuizComponentComponent],
  templateUrl: './play-quiz-page.component.html',
  styleUrls: ['./play-quiz-page.component.css'],
})
export class PlayQuizPageComponent {
  @ViewChild(QuizComponentComponent) quizComponent!: QuizComponentComponent;

  currentQuizIndex = 0;
  correctAnswersCount = 0;

  constructor(
    private quizService: QuizService,
    private playerService: PlayerService,
    private leaderboardService: LeaderboardService
  ) {}

  get quizQuestions(): Quiz[] {
    return this.quizService.quiz;
  }

  get currentQuiz() {
    return this.quizQuestions[this.currentQuizIndex];
  }

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
