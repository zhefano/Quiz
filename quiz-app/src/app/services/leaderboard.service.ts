import { Injectable } from '@angular/core';
import { LeaderboardContent } from '../models/leaderboard';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private leaderboardSubject = new BehaviorSubject<LeaderboardContent[]>([]);
  leaderboard$ = this.leaderboardSubject.asObservable();

  constructor() {
    this.loadLeaderboard();
  }

  private loadLeaderboard(): void {
    const savedLeaderboard = localStorage.getItem('leaderboard');
    if (savedLeaderboard) {
      this.leaderboardSubject.next(JSON.parse(savedLeaderboard));
    }
  }

  get leaderboard(): LeaderboardContent[] {
    return this.leaderboardSubject.value;
  }

  addScore(name: string, score: number): void {
    const newPlayer: LeaderboardContent = {
      name,
      score,
      date: new Date().toISOString(),
    };

    const currentLeaderboard = this.leaderboardSubject.value;
    const updatedLeaderboard = [...currentLeaderboard, newPlayer];

    // Sortera efter poäng
    updatedLeaderboard.sort((a, b) => b.score - a.score);

    // Uppdatera subject och spara till localStorage
    this.leaderboardSubject.next(updatedLeaderboard);
    this.saveLeaderboard();

    console.log('Updated leaderboard:', updatedLeaderboard); // Debug log
  }

  private saveLeaderboard(): void {
    localStorage.setItem(
      'leaderboard',
      JSON.stringify(this.leaderboardSubject.value)
    );
  }

  resetLeaderboard(): void {
    this.leaderboardSubject.next([]);
    localStorage.removeItem('leaderboard');
  }
}
