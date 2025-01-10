import { Routes } from "@angular/router";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { ResultPageComponent } from "./pages/result-page/result-page.component";
import { PlayQuizPageComponent } from "./pages/play-quiz-page/play-quiz-page.component";
import { CreateQuizPageComponent } from "./pages/create-quiz-page/create-quiz-page.component";
import { NewPlayerPageComponent } from "./pages/new-player-page/new-player-page.component";

export const routes: Routes = [
	{ path: "", component: LandingPageComponent },
	{ path: "new-player", component: NewPlayerPageComponent },
	{ path: "result", component: ResultPageComponent },
	{ path: "play-quiz", component: PlayQuizPageComponent },
	{ path: "create-quiz", component: CreateQuizPageComponent }	
];
