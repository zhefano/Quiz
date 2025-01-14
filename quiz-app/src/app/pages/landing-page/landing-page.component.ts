import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  player: Player | null = null;

  constructor(private router: Router, private playerService: PlayerService) {}

  ngOnInit(): void {
		// Subscribe to currentPlayer updates
    this.playerService.currentPlayer.subscribe((player) => {
      this.player = player;

      if (!player) {
        console.log('No player data found in PlayerService or localStorage');
        this.router.navigate(['/new-player']);
        console.log("Redirecting to new player page");
      } else {
        console.log('Player data from PlayerService:', this.player);
      }
    });
  }
}