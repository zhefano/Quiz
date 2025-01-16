import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardService } from '../../services/leaderboard.service';
import { LeaderboardContent } from '../../models/leaderboard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  leaderboard: LeaderboardContent[] = [];
  private subscription: Subscription | null = null;

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit() {
    // Subscribe to leaderboard updates
    this.subscription = this.leaderboardService.leaderboard$.subscribe(
      (updatedLeaderboard) => {
        this.leaderboard = updatedLeaderboard;
        console.log('Leaderboard updated:', this.leaderboard); // Debug log
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
