import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { QuizService } from './services/quiz.service';
import { Quiz } from './models/quiz';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quiz-app';
  private quizService: QuizService;


  constructor(quizService: QuizService) {
    this.quizService = quizService;
  }

  get quizQuestions(): Quiz[] {
    return this.quizService.quiz;
  }

}
