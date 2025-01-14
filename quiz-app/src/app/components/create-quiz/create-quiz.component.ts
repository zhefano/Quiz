import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaderboardService } from '../../services/leaderboard.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-create-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],
})
export class CreateQuizComponent {
  @Output() quizCreated = new EventEmitter<any>();
  questions: { question: string; answer: boolean }[] = [];
  newQuestion: string = '';
  newAnswer: boolean = true;

  feedbackMessage: string = '';
  feedbackClass: string = '';
  quizStarted: boolean = false;
  currentQuestionIndex: number = 0;
  score: number = 0; //Variabel som håller koll på poängen

  //Hämtar in leaderboardService samt playerService
  constructor(
    private leaderboardService: LeaderboardService,
    private playerService: PlayerService
  ) {}

  addQuestion() {
    if (this.newQuestion.trim()) {
      this.questions.push({
        question: this.newQuestion,
        answer: this.newAnswer,
      });
      this.newQuestion = '';
      this.newAnswer = true;
    }
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  playQuiz() {
    if (this.questions.length > 0) {
      this.quizStarted = true;
      this.currentQuestionIndex = 0;
      this.resetFeedbackMessage();
    } else {
      alert('Lägg till minst en fråga innan du spelar.');
    }
  }

  checkAnswer(isTrue: boolean): void {
    if (this.quizStarted) {
      const correctAnswer = this.questions[this.currentQuestionIndex].answer;

      if (isTrue === correctAnswer) {
        this.feedbackMessage = 'Correct answer! Good job!';
        this.feedbackClass = 'correct-answer';
        this.score++; // vid korrekt svar, öka poäng med 1
      } else {
        this.feedbackMessage = 'Wrong ansver! Try again.';
        this.feedbackClass = 'incorrect-answer';
      }

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        alert('Quizet är slut! Du kan gå tillbaka till startsidan.');
        this.saveScore(); //Anropar savescore metoden när quizet är färdigt
      }
    }
  }

  //samma metod som play-quiz använder
  saveScore() {
    const player = this.playerService.getPlayerFromLocalStorage();
    if (player) {
      const playerName = player.username;
      this.leaderboardService.addScore(playerName, this.score);
      console.log(
        `Poäng sparad för spelare: ${playerName}, Poäng: ${this.score}`
      );
    } else {
      console.warn('Ingen spelare hittades i localStorage.');
    }
  }

  goBack(): void {
    this.quizStarted = false;
    this.resetFeedbackMessage();
  }

  resetFeedbackMessage(): void {
    this.feedbackMessage = '';
    this.feedbackClass = '';
  }

  resetForm() {
    this.questions = [];
    this.newQuestion = '';
    this.newAnswer = true;
    this.resetFeedbackMessage();
    this.quizStarted = false;
  }
}
