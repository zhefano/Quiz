import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../models/quiz';

@Component({
  selector: 'app-quiz-component',
  imports: [],
  templateUrl: './quiz-component.component.html',
  styleUrl: './quiz-component.component.css',
})
export class QuizComponentComponent {
  quizzes: Quiz[] = [];

  constructor(private quizService: QuizService) {}
}
