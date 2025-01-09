

import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ResultPageComponent } from './pages/result-page/result-page.component';
import { PlayQuizPageComponent } from './pages/play-quiz-page/play-quiz-page.component';
import { UserFormPageComponent } from './pages/user-form-page/user-form-page.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'new-player', component: UserFormPageComponent }, // Change name to NewPlayerPage?
    { path: 'result', component: ResultPageComponent },
    { path: 'play-quiz', component: PlayQuizPageComponent },
    ];