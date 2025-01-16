import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player';

@Component({
  selector: 'app-new-player-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-player-page.component.html',
  styleUrls: ['./new-player-page.component.css'],
})
export class NewPlayerPageComponent {
  playerCreationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private playerService: PlayerService
  ) {
    this.playerCreationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      quizPlayedAmount: 0,
      quizCreatedAmount: 0,
      questionsAnsweredAmount: 0,
      totalPoints: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
  }

  onSubmit(): void {
    if (this.playerCreationForm.valid) {
      // Sparar datan från formuläret i playerData som är en "Player"
      const playerData: Player = this.playerCreationForm.value;
      // Skapar en ny spelare med hjälp av playerService

      this.playerService.createPlayer(playerData);
      // Skickas till "landing page"

      this.router.navigate(['']);
    } else {
      console.log(this.playerCreationForm.value);
      // error message for user here
    }
  }
}
