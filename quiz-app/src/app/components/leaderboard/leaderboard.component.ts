import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardService } from '../../services/leaderboard.service';
import { LeaderboardContent } from '../../models/leaderboard';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent {
  leaderboard: LeaderboardContent[] = [];

  constructor(private leaderboardService: LeaderboardService) {
    this.leaderboard = this.leaderboardService.leaderboard;
  }
}