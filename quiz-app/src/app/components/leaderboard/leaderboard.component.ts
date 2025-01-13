import { Component } from '@angular/core';
import { LeaderboardContent } from '../../models/leaderboard';
import { LeaderboardService } from '../../services/leaderboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
  leaderboard: LeaderboardContent[] = []

  constructor( private leaderboardService: LeaderboardService) {
    this.leaderboard = this.leaderboardService.leaderboard
  }

}
