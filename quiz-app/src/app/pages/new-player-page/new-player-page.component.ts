import { Component } from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "app-new-player-page",
	imports: [ReactiveFormsModule],
	templateUrl: "./new-player-page.component.html",
	styleUrl: "./new-player-page.component.css",
})
export class NewPlayerPageComponent {
	playerCreationForm: FormGroup;
	constructor(private formBuilder: FormBuilder, private router: Router) {
		this.playerCreationForm = this.formBuilder.group({
			username: ["", [Validators.required, Validators.minLength(2)]],
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
			console.log(this.playerCreationForm.value);
			this.router.navigate(["/play-quiz"]);
		} else {
			console.log(this.playerCreationForm.value);
			// error message for user here
		}
	}
}
