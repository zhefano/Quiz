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
    console.log(this.quiz);

    // fetch('https://opentdb.com/api.php?amount=10&type=boolean')
    // .then(res => res.json())
    // .then(res => this.quiz = res.results);
  }

  saveQuizToLocalStorage():void {
    localStorage.setItem('quizData', JSON.stringify(this.quiz));
  }
}
