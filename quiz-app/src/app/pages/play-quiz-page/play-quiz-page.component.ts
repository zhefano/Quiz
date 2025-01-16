import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponentComponent } from '../../components/quiz-component/quiz-component.component';
import { QuizService } from '../../services/quiz.service';
import { PlayerService } from '../../services/player.service';
import { LeaderboardService } from '../../services/leaderboard.service';
import { Quiz } from '../../models/quiz';
import { Router } from '@angular/router';

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
  quizFinished = false;

  constructor(
    private quizService: QuizService,
    private playerService: PlayerService,
    private leaderboardService: LeaderboardService,
    private router: Router
  ) {}

  get quizQuestions(): Quiz[] {
    return this.quizService.quiz;
  }

  get currentQuiz() {
    return this.quizQuestions[this.currentQuizIndex];
  }

  nextQuiz() {
    if (this.currentQuizIndex < this.quizQuestions.length - 1) {
      this.quizComponent.isButtonDisabled = false;
      this.currentQuizIndex++;
      this.quizComponent.resetFeedbackMessage(); // Nollställ feedbacken
    }
  }

  previousQuiz() {
    if (this.currentQuizIndex > 0) {
      this.quizComponent.isButtonDisabled = false;
      this.currentQuizIndex--;
      this.quizComponent.resetFeedbackMessage(); // Nollställ feedbacken
    }
  }

  incrementCorrectAnswers(): void {
    this.correctAnswersCount++;
    console.log('Current score:', this.correctAnswersCount); // Debug log
  }

  finishQuiz(): void {
    const player = this.playerService.getPlayerFromLocalStorage();
    if (player) {
      const playerName = player.username;
      this.leaderboardService.addScore(playerName, this.correctAnswersCount);
      console.log(`Saving score for player: ${playerName}, Score: ${this.correctAnswersCount}`);
      this.quizFinished = true;
      alert(`Quiz completed! Your score: ${this.correctAnswersCount}`);
      // Valfritt omdirigera till topplistan eller startsidan
      this.router.navigate(['/']);
    } else {
      console.warn('No player found in localStorage');
      alert('Please create a player profile first');
      this.router.navigate(['/new-player']);
    }
  }
}
