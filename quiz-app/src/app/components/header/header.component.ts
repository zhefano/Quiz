import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { LeaderboardService } from '../../services/leaderboard.service';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private playerService: PlayerService,
    private leaderboardService: LeaderboardService,
    private quizService: QuizService,
    private router: Router
  ) {}

  resetAll(): void {
    this.playerService.resetPlayer();
    this.leaderboardService.resetLeaderboard();
    this.quizService.resetQuiz();
    this.router.navigate(['/new-player']);
  }
}
