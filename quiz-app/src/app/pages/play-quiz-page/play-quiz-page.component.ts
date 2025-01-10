import { Component, ViewChild } from '@angular/core';
import { QuizComponentComponent } from '../../components/quiz-component/quiz-component.component';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz';

@Component({
  selector: 'app-play-quiz-page',
  imports: [QuizComponentComponent],
  templateUrl: './play-quiz-page.component.html',
  styleUrl: './play-quiz-page.component.css',
})
export class PlayQuizPageComponent {
  private quizService: QuizService;
  @ViewChild(QuizComponentComponent) quizComponent!: QuizComponentComponent; // Hämta referens

  constructor(quizService: QuizService) {
    this.quizService = quizService;
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
}
