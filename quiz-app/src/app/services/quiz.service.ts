import { Inject, Injectable } from '@angular/core';
import { Quiz } from '../models/quiz';
import { quizData } from '../quizData';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  quiz: Quiz[] = [];

  constructor() {
    this.quiz = JSON.parse(quizData);
  }

  saveQuizToLocalStorage(): void {
    localStorage.setItem('quizData', JSON.stringify(this.quiz));
  }

  resetQuiz(): void {
    localStorage.removeItem('quizData');
    this.quiz = JSON.parse(quizData);
  }
}
