import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  SimpleChanges,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Quiz } from '../../models/quiz';
import { PlayQuizPageComponent } from '../../pages/play-quiz-page/play-quiz-page.component';

@Component({
  selector: 'app-quiz-component',
  imports: [CommonModule],
  templateUrl: './quiz-component.component.html',
  styleUrl: './quiz-component.component.css',
})
export class QuizComponentComponent {
  @Input() quiz: Quiz | null = null;
  @Output() correctAnswer = new EventEmitter<void>(); // Event för korrekta svar
  @ViewChild(PlayQuizPageComponent) quizPageComponent!: PlayQuizPageComponent;

  userAnswer: string | null = null;
  feedbackClass: string = '';
  feedbackMessage: string = '';
  isButtonDisabled: boolean = false;

  checkAnswer(isTrue: boolean): void {
    if (this.quiz) {
      const correctAnswer = this.quiz.correct_answer === 'True';

      if (isTrue === correctAnswer) {
        this.feedbackMessage = 'Rätt svar! Bra jobbat!';
        this.feedbackClass = 'correct-answer';
        this.correctAnswer.emit();
      } else {
        this.feedbackMessage = 'Fel svar! Försök igen.';
        this.feedbackClass = 'incorrect-answer';
      }
    }
    this.isButtonDisabled = true;
    //this.quizPageComponent.nextQuiz();
  }
  resetFeedbackMessage(): void {
    this.feedbackMessage = '';
    this.feedbackClass = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quiz']) {
      this.resetFeedbackMessage();
    }
  }
}
