import { Injectable } from '@angular/core';
import { LeaderboardContent } from '../models/leaderboard';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  leaderboard: LeaderboardContent[] = [];

  constructor() {
    const savedLeaderboard = localStorage.getItem('leaderboard');
    if (savedLeaderboard) {
      this.leaderboard = JSON.parse(savedLeaderboard);
    }
  }

  // Lägg till poäng, namn och spara i localStorage
  addScore(name: string, score: number): void {
    const newPlayer: LeaderboardContent = {
      name,
      score,
      date: new Date().toISOString(),
    };

    //Lägger till den nya poängen
    //Sorterar listan etfer poäng
    //sparar listan
    this.leaderboard.push(newPlayer);
    this.leaderboard.sort((a, b) => b.score - a.score);
    this.saveLeaderboard();
  }

  // Spara leaderboarden i localStorage
  saveLeaderboard(): void {
    localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
  }
}
