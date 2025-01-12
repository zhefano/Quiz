import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  addQuestion() {
    if (this.newQuestion.trim()) {
      this.questions.push({ question: this.newQuestion, answer: this.newAnswer });
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
      } else {
        this.feedbackMessage = 'Wrong ansver! Try again.';
        this.feedbackClass = 'incorrect-answer';
      }

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        alert('Quizet är slut! Du kan gå tillbaka till startsidan.');
      }
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




