import { Component } from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "app-user-form-page",
	imports: [ReactiveFormsModule],
	templateUrl: "./user-form-page.component.html",
	styleUrl: "./user-form-page.component.css",
})
export class UserFormPageComponent {
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
			this.router.navigate(["/quiz"]);
		} else {
			console.log(this.playerCreationForm.value);
			// error message for user here
		}
	}
}
