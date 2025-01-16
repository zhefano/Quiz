import { Component } from '@angular/core';
import { CreateQuizComponent } from '../../components/create-quiz/create-quiz.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-quiz-page',
  standalone: true,
  imports: [CommonModule, CreateQuizComponent],
  templateUrl: './create-quiz-page.component.html',
  styleUrls: ['./create-quiz-page.component.css'],
})
export class CreateQuizPageComponent {
  currentQuiz: any | null = null;
  currentQuestionIndex: number = 0;
  quizFinished: boolean = false;

  startQuiz(quiz: any) {
    this.currentQuiz = quiz;
    this.currentQuestionIndex = 0;
    this.quizFinished = false;
  }

  answerQuestion(isTrue: boolean) {
    if (this.currentQuiz) {
      const correctAnswer =
        this.currentQuiz.questions[this.currentQuestionIndex].answer;
      // Här kan du valfritt kolla om isTrue === correctAnswer
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex >= this.currentQuiz.questions.length) {
        this.quizFinished = true;
      }
    }
  }

  resetQuiz() {
    this.currentQuiz = null;
    this.currentQuestionIndex = 0;
    this.quizFinished = false;
  }
}
